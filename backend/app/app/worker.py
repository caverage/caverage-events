from typing import Any

import requests
from celery.utils.log import get_task_logger
from raven import Client

from app.core.celery_app import celery_app
from app.core.config import settings
from app.crud import invite as invite_crud
from app.db.session import SessionLocal

client_sentry = Client(settings.SENTRY_DSN)
logger = get_task_logger(__name__)


@celery_app.task
def send_invite(invite_id: int) -> bool:
    try:
        db = SessionLocal()
        invite = invite_crud.get(db, id=invite_id)
        if invite:
            if not invite.sent:
                endpoint = f"{settings.SMS_API_URI}/{settings.SMS_DID}/send"
                data = {
                    "key": settings.SMS_APIKEY,
                    "destination": f"1{invite.user.number}",
                    "message": "Le new invite",
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
