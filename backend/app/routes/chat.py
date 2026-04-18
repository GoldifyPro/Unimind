import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.data.database import get_db, Conversation, Message
from app.core.ollama_client import get_model_response
from app.core.formatter import format_response
from app.core.safety import check_crisis, get_crisis_reply, log_crisis_event
from app.data.resources_data import match_resources
from app.models.schemas import ChatRequest
from app.auth.jwt_handler import get_current_user

router = APIRouter(tags=["Chat"])


def _get_last_messages(db: Session, conversation_id: int, limit: int = 30) -> list:
    msgs = (
        db.query(Message)
        .filter(Message.conversation_id == conversation_id)
        .order_by(Message.timestamp.desc())
        .limit(limit)
        .all()
    )
    return msgs[::-1]  # oldest first


@router.post("/chat")
def chat(req: ChatRequest, db: Session = Depends(get_db)):
    # Generate user_id if frontend didn't send one (backwards compatible)
    if not req.user_id:
        req.user_id = str(uuid.uuid4())

    # ── Crisis check — always first ─────────────────────────────────────────
    if check_crisis(req.message):
        log_crisis_event(db, req.user_id, req.message)
        return {
            "reply": get_crisis_reply(),
            "html": False,
            "crisis": True,
            "user_id": req.user_id,
            "conversation_id": None
        }

    # ── Get or create conversation ───────────────────────────────────────────
    conversation = None

    if req.conversation_id:
        conversation = (
            db.query(Conversation)
            .filter(
                Conversation.conversation_id == req.conversation_id,
                Conversation.user_id == req.user_id
            )
            .first()
        )

    if not conversation:
        conversation = (
            db.query(Conversation)
            .filter(Conversation.user_id == req.user_id)
            .order_by(Conversation.created_at.desc())
            .first()
        )

    if not conversation:
        conversation = Conversation(user_id=req.user_id)
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

    conversation_id = conversation.conversation_id

    # ── Save user message ────────────────────────────────────────────────────
    db.add(Message(conversation_id=conversation_id, role="user", content=req.message))
    db.commit()

    # ── Build history and call AI ────────────────────────────────────────────
    last_msgs = _get_last_messages(db, conversation_id, limit=30)
    history   = [{"role": m.role, "content": m.content} for m in last_msgs]

    raw_response = get_model_response(history)

    # ── Save raw AI response ─────────────────────────────────────────────────
    db.add(Message(conversation_id=conversation_id, role="assistant", content=raw_response))
    db.commit()

    # ── Format + append relevant resources ──────────────────────────────────
    formatted_reply = format_response(raw_response)
    resources       = match_resources(req.message)

    if resources:
        resource_lines = "\n\nHere are some resources that might help:"
        for r in resources:
            resource_lines += f"\n- {r['name']}: {r.get('contact') or r.get('url', '')}"
        formatted_reply += resource_lines

    return {
        "reply": formatted_reply,
        "html": req.html,
        "crisis": False,
        "user_id": req.user_id,
        "conversation_id": conversation_id
    }


@router.get("/chat/history/{conversation_id}")
def get_history(
    conversation_id: int,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user)
):
    convo = (
        db.query(Conversation)
        .filter(
            Conversation.conversation_id == conversation_id,
            Conversation.user_id == user["user_id"]
        )
        .first()
    )
    if not convo:
        raise HTTPException(status_code=404, detail="Conversation not found")

    messages = (
        db.query(Message)
        .filter(Message.conversation_id == conversation_id)
        .order_by(Message.timestamp.asc())
        .all()
    )
    return {
        "conversation_id": conversation_id,
        "messages": [
            {"role": m.role, "content": m.content, "timestamp": m.timestamp.isoformat()}
            for m in messages
        ]
    }


@router.get("/chat/conversations")
def get_conversations(
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user)
):
    if user["is_guest"]:
        return {"conversations": []}

    convos = (
        db.query(Conversation)
        .filter(Conversation.user_id == user["user_id"])
        .order_by(Conversation.created_at.desc())
        .all()
    )
    return {
        "conversations": [
            {"conversation_id": c.conversation_id, "created_at": c.created_at.isoformat()}
            for c in convos
        ]
    }