from typing import List, Optional

from pydantic import BaseModel

from app.models.invite import InviteStatus
from app.schemas.user import User


# Shared properties
class InviteBase(BaseModel):
    event_id: Optional[int] = None
    user_id: Optional[int] = None
    status: Optional[InviteStatus] = None


class InviteAPICreate(BaseModel):
    user_ids: List[int]
    event_id: int


# Properties to receive on item creation
class InviteCreate(InviteBase):
    event_id: int
    user_id: int
    status: InviteStatus


# Properties to receive on item update
class InviteUpdate(InviteBase):
    pass


# Properties shared by models stored in DB
class InviteInDBBase(InviteBase):
    id: int
    event_id: int
    user_id: int

    class Config:
        orm_mode = True


# Properties to return to client
class Invite(InviteInDBBase):
    user: Optional[User] = None


# Additional properties stored in DB
class InviteInDB(InviteBase):
    pass
