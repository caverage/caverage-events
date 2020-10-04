from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from app.db.base_class import Base

if TYPE_CHECKING:
    from .invite import Invite  # noqa: F401
    from .login_link import LoginLink  # noqa: F401


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean(), default=True)
    is_superuser = Column(Boolean(), default=False)
    invites = relationship("Invite", back_populates="user")
    login_links = relationship("LoginLink", uselist=True)
    number = Column(String(11), index=True, unique=True, nullable=False)
