from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship

from app.db.base_class import Base

if TYPE_CHECKING:
    from .event import Event  # noqa: F401
    from .login_link import LoginLink  # noqa: F401

UserEvent = Table(
    "user_event",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("user.id")),
    Column("event_id", Integer, ForeignKey("event.id")),
)


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean(), default=True)
    is_superuser = Column(Boolean(), default=False)
    events = relationship("Event", secondary=UserEvent, back_populates="attendees")
    login_links = relationship("LoginLink", uselist=True)
    number = Column(String(11), index=True, unique=True, nullable=False)
