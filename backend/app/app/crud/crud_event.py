from typing import Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.event import Event
from app.schemas.event import EventCreate, EventUpdate


class CRUDEvent(CRUDBase[Event, EventCreate, EventUpdate]):
    def get_by_name(self, db: Session, *, name: str) -> Optional[Event]:
        return db.query(Event).filter(Event.name == name).first()


event = CRUDEvent(Event)
