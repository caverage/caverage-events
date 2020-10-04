from typing import List, Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.invite import Invite
from app.schemas.invite import InviteCreate, InviteUpdate


class CRUDInvite(CRUDBase[Invite, InviteCreate, InviteUpdate]):
    def get_by_event(self, db: Session, *, event_id: int) -> Optional[List[Invite]]:
        return db.query(Invite).filter(Invite.event_id == event_id).all()


invite = CRUDInvite(Invite)
