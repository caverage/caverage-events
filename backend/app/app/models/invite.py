import enum
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Enum, ForeignKey, Integer
from sqlalchemy.orm import relationship

from app.db.base_class import Base

if TYPE_CHECKING:
    from .event import Event  # noqa: F401
    from .user import User  # noqa: F401


class InviteStatus(enum.Enum):
    NO_RESPONSE = "NO_RESPONSE"
    NO = "NO"
    MAYBE = "MAYBE"
    YES = "YES"


class Invite(Base):
    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("event.id"), index=True)
    event = relationship("Event", back_populates="invites")
    user_id = Column(Integer, ForeignKey("user.id"), index=True)
    user = relationship("User", back_populates="invites")
    status = Column(
        Enum(InviteStatus), nullable=False, default=InviteStatus.NO_RESPONSE
    )
    sent = Column(Boolean, default=False, nullable=False)
