from datetime import datetime, timedelta
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import backref, relationship

from app.db.base_class import Base

if TYPE_CHECKING:
    from .user import User  # noqa: F401


class LoginLink(Base):
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, index=True, unique=True)
    user_id = Column(Integer, ForeignKey("user.id"), index=True)
    user = relationship("User", backref=backref("login_links", uselist=True))
    active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.now())
    expires_at = Column(DateTime, default=datetime.now() + timedelta(hours=1))
    expires_at_timestamp = Column(
        Integer, default=(datetime.now() + timedelta(hours=1)).timestamp()
    )
