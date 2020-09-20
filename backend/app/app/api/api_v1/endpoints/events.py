from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.core.config import settings

router = APIRouter()


@router.get("/", response_model=List[schemas.Event])
def read_events(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve events.
    """
    events = crud.event.get_multi(db, skip=skip, limit=limit)
    return events


@router.post("/", response_model=schemas.Event)
def create_event(
    *,
    db: Session = Depends(deps.get_db),
    event_in: schemas.EventCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new event.
    """
    event = crud.event.get_by_name(db, name=event_in.name)
    if event:
        raise HTTPException(
            status_code=400, detail="An event with this name already exists.",
        )
    event = crud.event.create(db, obj_in=event_in)
    return event


@router.get("/{event_id}", response_model=schemas.Event)
def read_event_by_id(
    event_id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get a specific event by id.
    """
    event = crud.event.get(db, id=event_id)
    return event


@router.put("/{event_id}", response_model=schemas.Event)
def update_event(
    *,
    db: Session = Depends(deps.get_db),
    event_id: int,
    event_in: schemas.EventUpdate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update an event.
    """
    event = crud.event.get(db, id=event_id)
    if not event:
        raise HTTPException(
            status_code=404, detail="This event does not exist.",
        )
    event = crud.event.update(db, db_obj=event, obj_in=event_in)
    return event
