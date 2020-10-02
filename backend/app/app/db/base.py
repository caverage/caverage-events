# Import all the models, so that Base has them before being
# imported by Alembic
from app.db.base_class import Base  # noqa
from app.models.event import Event  # noqa
from app.models.login_link import LoginLink  # noqa
from app.models.user import User  # noqa
