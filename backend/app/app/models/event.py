from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.db.base_class import Base

from .user import UserEvent

if TYPE_CHECKING:
    from .user import User  # noqa: F401


class Event(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    date = Column(String)
    attendees = relationship("User", secondary=UserEvent, back_populates="events")
