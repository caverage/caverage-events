from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from .user import User


# Shared properties
class LoginLinkBase(BaseModel):
    code: Optional[str] = None
    active: Optional[bool] = None
    user_id: Optional[int] = None


# Properties to receive on item creation
class LoginLinkCreate(LoginLinkBase):
    user: User


# Properties to receive on item update
class LoginLinkUpdate(LoginLinkBase):
    pass


# Properties shared by models stored in DB
class LoginLinkDBBase(LoginLinkBase):
    id: int
    code: str
    user_id: int
    created_at: datetime
    expires_at: datetime

    class Config:
        orm_mode = True


# Properties to return to client
class LoginLink(LoginLinkDBBase):
    pass


# Additional properties stored in DB
class EventInDB(LoginLinkDBBase):
    pass
