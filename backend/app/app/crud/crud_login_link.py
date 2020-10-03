from typing import Any, Dict, Optional, Union
from uuid import uuid4

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.crud.crud_user import user
from app.models.login_link import LoginLink
from app.schemas.login_link import LoginLinkCreate, LoginLinkUpdate


class CRUDLoginLink(CRUDBase[LoginLink, LoginLinkCreate, LoginLinkUpdate]):
    def get_by_code(self, db: Session, *, code: str) -> Optional[LoginLink]:
        return db.query(LoginLink).filter(LoginLink.code == code).first()

    def create(self, db: Session, *, obj_in: LoginLinkCreate) -> LoginLink:
        code = str(uuid4())[:8]
        link = self.get_by_code(db, code=code)
        while link:
            code = str(uuid4())[:8]
            link = self.get_by_code(db, code=code)
        found_user = user.get(db, id=obj_in.user.id)
        assert found_user is not None
        db_obj = LoginLink(code=code.upper(), user=found_user)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: LoginLink,
        obj_in: Union[LoginLinkUpdate, Dict[str, Any]]
    ) -> LoginLink:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def is_active(self, db_obj: LoginLink) -> bool:
        return db_obj.active

    def disable(self, db: Session, *, db_obj: LoginLink) -> bool:
        setattr(db_obj, "active", False)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj.active


login_link = CRUDLoginLink(LoginLink)
