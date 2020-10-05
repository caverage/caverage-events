from typing import Any

import requests
from celery.utils.log import get_task_logger
from raven import Client

from app.core.celery_app import celery_app
from app.core.config import settings
from app.crud import event as event_crud
from app.crud import invite as invite_crud
from app.db.session import SessionLocal
from app.models import Event, Invite

client_sentry = Client(settings.SENTRY_DSN)
logger = get_task_logger(__name__)


@celery_app.task
def send_invite(invite_id: int) -> bool:
    try:
        db = SessionLocal()
        invite = invite_crud.get(db, id=invite_id)
        assert isinstance(invite, Invite)
        event = event_crud.get(db, id=invite.event_id)
        assert isinstance(event, Event)
        if invite:
            if not invite.sent:
                endpoint = f"{settings.SMS_API_URI}/{settings.SMS_DID}/send"
                name = invite.user.full_name.split()[0] if invite.user.full_name else ""
                message = f"Hey {name}! You've been invited to {event.name} at Caverage(AKA The Gym). For more info and to RSVP please visit: https://cavera.ge/rsvp/{invite.code}"
                data = {
                    "key": settings.SMS_APIKEY,
                    "destination": f"1{invite.user.number}",
                    "message": message,
                }

                response = requests.post(url=endpoint, data=data)

                if response.json()["success"]:
                    invite_crud.update(db, db_obj=invite, obj_in={"sent": True})
                    return True

        return False
    finally:
        db.close()


def get_db() -> Any:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
