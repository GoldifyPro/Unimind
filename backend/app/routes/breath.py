from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.data.database import get_db, BreathingSession
from app.auth.jwt_handler import get_current_user
from app.models.schemas import BreathingRequest

router = APIRouter(prefix="/api/breathe", tags=["Breathe"])


@router.post("/session")
def log_session(
    body: BreathingRequest,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user)
):
    session = BreathingSession(
        user_id=user["user_id"],
        technique=body.technique,
        cycles_completed=body.cycles_completed,
        duration_seconds=body.duration_seconds
    )
    db.add(session)
    db.commit()
    db.refresh(session)

    return {"id": session.id, "technique": session.technique,
            "cycles_completed": session.cycles_completed,
            "duration_seconds": session.duration_seconds,
            "created_at": session.created_at.isoformat()}


@router.get("/history")
def breathing_history(db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    if user["is_guest"]:
        return {"sessions": []}

    sessions = (
        db.query(BreathingSession)
        .filter(BreathingSession.user_id == user["user_id"])
        .order_by(BreathingSession.created_at.desc())
        .limit(20).all()
    )
    return {"sessions": [
        {"id": s.id, "technique": s.technique, "cycles_completed": s.cycles_completed,
         "duration_seconds": s.duration_seconds, "created_at": s.created_at.isoformat()}
        for s in sessions
    ]}


@router.get("/stats")
def breathing_stats(db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    if user["is_guest"]:
        return {"total_sessions": 0, "total_minutes": 0, "favourite_technique": None}

    sessions = (
        db.query(BreathingSession)
        .filter(BreathingSession.user_id == user["user_id"])
        .all()
    )
    if not sessions:
        return {"total_sessions": 0, "total_minutes": 0, "favourite_technique": None}

    total_secs = sum(s.duration_seconds for s in sessions)
    techniques = {}
    for s in sessions:
        techniques[s.technique] = techniques.get(s.technique, 0) + 1

    return {
        "total_sessions": len(sessions),
        "total_minutes": round(total_secs / 60, 1),
        "favourite_technique": max(techniques, key=techniques.get)
    }