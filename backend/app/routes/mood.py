from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.data.database import get_db, MoodCheckin
from app.auth.jwt_handler import get_current_user
from app.models.schemas import MoodRequest

router = APIRouter(prefix="/api/mood", tags=["Mood"])

VALID_MOODS = ["great", "good", "okay", "low", "struggling"]


@router.post("/")
def log_mood(
    body: MoodRequest,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user)
):
    if body.mood.lower() not in VALID_MOODS:
        raise HTTPException(status_code=400, detail=f"Mood must be one of: {VALID_MOODS}")

    checkin = MoodCheckin(user_id=user["user_id"], mood=body.mood.lower(), note=body.note)
    db.add(checkin)
    db.commit()
    db.refresh(checkin)

    return {"id": checkin.id, "mood": checkin.mood, "note": checkin.note,
            "created_at": checkin.created_at.isoformat()}


@router.get("/history")
def mood_history(db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    if user["is_guest"]:
        return {"moods": [], "message": "Mood history not saved for guests"}

    moods = (
        db.query(MoodCheckin)
        .filter(MoodCheckin.user_id == user["user_id"])
        .order_by(MoodCheckin.created_at.desc())
        .limit(30).all()
    )
    return {"moods": [
        {"id": m.id, "mood": m.mood, "note": m.note, "created_at": m.created_at.isoformat()}
        for m in moods
    ]}


@router.get("/latest")
def latest_mood(db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    if user["is_guest"]:
        return {"mood": None}

    latest = (
        db.query(MoodCheckin)
        .filter(MoodCheckin.user_id == user["user_id"])
        .order_by(MoodCheckin.created_at.desc())
        .first()
    )
    if not latest:
        return {"mood": None}
    return {"mood": latest.mood, "created_at": latest.created_at.isoformat()}