from typing import Any, Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.crud.crud_invite import invite
from app.models.event import Event
from app.schemas.event import EventCreate, EventUpdate


class CRUDEvent(CRUDBase[Event, EventCreate, EventUpdate]):
    def get_by_name(self, db: Session, *, name: str) -> Optional[Event]:
        return db.query(Event).filter(Event.name == name).first()

    def get(self, db: Session, id: Any) -> Optional[Event]:
        event = db.query(Event).filter(Event.id == id).first()
        event.invites = invite.get_by_event(db, event_id=event.id)
        return event


event = CRUDEvent(Event)
