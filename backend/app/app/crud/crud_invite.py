from typing import List, Optional
from uuid import uuid4

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.invite import Invite
from app.schemas.invite import InviteCreate, InviteUpdate


class CRUDInvite(CRUDBase[Invite, InviteCreate, InviteUpdate]):
    def get_by_code(self, db: Session, *, code: str) -> Optional[Invite]:
        return db.query(Invite).filter(Invite.code == code).first()

    def get_by_event(self, db: Session, *, event_id: int) -> Optional[List[Invite]]:
        return db.query(Invite).filter(Invite.event_id == event_id).all()

    def create(self, db: Session, *, obj_in: InviteCreate) -> Invite:
        code = str(uuid4())[:8]
        invite = self.get_by_code(db, code=code)
        while invite:
            code = str(uuid4())[:8]
            invite = self.get_by_code(db, code=code)
        db_obj = Invite(
            event_id=obj_in.event_id,
            user_id=obj_in.user_id,
            status=obj_in.status.value,
            code=code.upper(),
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


invite = CRUDInvite(Invite)
