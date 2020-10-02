from datetime import datetime, timedelta
from typing import Any

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.core import security
from app.core.config import settings
from app.core.security import get_password_hash
from app.utils import (
    generate_password_reset_token,
    send_reset_password_email,
    verify_password_reset_token,
)

router = APIRouter()


@router.post(
    "/login/access-token-link-create/{user_id}", response_model=schemas.LoginLink
)
def login_access_token_link_create(
    user_id: int, db: Session = Depends(deps.get_db)
) -> Any:
    """
    TODO: Make this route be protected, currently it's wide open.
    Probably needs to not use user based authentication though and just be
    completely locked and called exclusively from somewhere else that gets
    triggered by a user.
    """
    user = crud.user.get(db, id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User ID Not Found")
    login_link = crud.login_link.create(db, obj_in=schemas.LoginLinkCreate(user=user))
    if not login_link:
        raise HTTPException(
            status_code=500, detail="Unknown error occured creating login link"
        )
    return login_link


@router.post("/login/access-token", response_model=schemas.Token)
def login_access_token(
    db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = crud.user.authenticate(
        db, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not crud.user.is_active(user):
        raise HTTPException(status_code=400, detail="Inactive user")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }


@router.post("/login/access-token-link/{code}", response_model=schemas.Token)
def login_access_token_link(code: str, db: Session = Depends(deps.get_db)) -> Any:
    """
    """
    link = crud.login_link.get_by_code(db, code=code)

    if not link:
        raise HTTPException(status_code=400, detail="Invalid Login Link")

    if datetime.now().timestamp() > link.expires_at_timestamp:
        raise HTTPException(status_code=400, detail="Login Link Expired")

    user = link.user
    if not user:
        raise HTTPException(status_code=400, detail="Invalid Login Link")
    if not crud.user.is_active(user):
        raise HTTPException(status_code=400, detail="Inactive user")

    if not settings.ALLOW_SUPERUSER_LOGIN_BY_CODE:
        if crud.user.is_superuser(user):
            raise HTTPException(
                status_code=400, detail="Admins cannot login via a code"
            )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }


@router.post("/login/test-token", response_model=schemas.User)
def test_token(current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Test access token
    """
    return current_user


@router.post("/password-recovery/{email}", response_model=schemas.Msg)
def recover_password(email: str, db: Session = Depends(deps.get_db)) -> Any:
    """
    Password Recovery
    """
    user = crud.user.get_by_email(db, email=email)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system.",
        )
    password_reset_token = generate_password_reset_token(email=email)
    send_reset_password_email(
        email_to=user.email, email=email, token=password_reset_token
    )
    return {"msg": "Password recovery email sent"}


@router.post("/reset-password/", response_model=schemas.Msg)
def reset_password(
    token: str = Body(...),
    new_password: str = Body(...),
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Reset password
    """
    email = verify_password_reset_token(token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid token")
    user = crud.user.get_by_email(db, email=email)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system.",
        )
    elif not crud.user.is_active(user):
        raise HTTPException(status_code=400, detail="Inactive user")
    hashed_password = get_password_hash(new_password)
    user.hashed_password = hashed_password
    db.add(user)
    db.commit()
    return {"msg": "Password updated successfully"}
