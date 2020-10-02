from typing import Optional

from pydantic import BaseModel


# Shared properties
class EventBase(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    date: Optional[str] = None


# Properties to receive on item creation
class EventCreate(EventBase):
    name: str
    description: str
    date: str


# Properties to receive on item update
class EventUpdate(EventBase):
    pass


# Properties shared by models stored in DB
class EventInDBBase(EventBase):
    id: int

    class Config:
        orm_mode = True


# Properties to return to client
class Event(EventInDBBase):
    pass


# Additional properties stored in DB
class EventInDB(EventBase):
    pass
