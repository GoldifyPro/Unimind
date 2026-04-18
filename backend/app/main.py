from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import uuid

from Unimind.backend.app.core.ollama_client import get_model_response
from app.safety import check_crisis
from Unimind.backend.app.core.prompts import SYSTEM_PROMPT
from Unimind.backend.app.core.formatter import format_response
from app.resources import get_resources
from Unimind.backend.app.data.database import Conversation, Message, SessionLocal, init_db


# -----------------------------
# FASTAPI SETUP
# -----------------------------
app = FastAPI(title="UniMind Chat API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize DB on startup
init_db()

@app.get("/health")
def health():
    return {"status": "ok"}


# -----------------------------
# Pydantic schema
# -----------------------------
class ChatRequest(BaseModel):
    message: str
    html: bool = False
    user_id: str = None
    conversation_id: int = None  # optional: resume a specific conversation


# -----------------------------
# Helper: fetch last N messages
# -----------------------------
def get_last_messages(db, conversation_id: int, limit: int = 30):
    msgs = (
        db.query(Message)
        .filter(Message.conversation_id == conversation_id)
        .order_by(Message.timestamp.desc())
        .limit(limit)
        .all()
    )
    return msgs[::-1]  # oldest first


# -----------------------------
# Chat endpoint
# -----------------------------
@app.post("/chat")
def chat(req: ChatRequest):
    db = SessionLocal()

    # Generate a stable user_id if missing (frontend should store and re-send this)
    if not req.user_id:
        req.user_id = str(uuid.uuid4())

    # --- Crisis check — must happen before anything else ---
    if check_crisis(req.message):
        crisis_text = (
            "What you're carrying right now sounds incredibly heavy — "
            "not having enough to eat, feeling the weight of everything at once. "
            "That's a lot for one person to hold.\n\n"
            "Please know that you matter, and this moment is not the end of your story.\n\n"
            "Please reach out to someone who can help right now:\n"
            "- A trusted friend, family member, or lecturer\n"
            "- Your university's counseling or student support services\n"
            "- A crisis helpline in your area\n\n"
            "You don't have to face this alone. "
            "Is there one person you can call or go to right now?"
        )
        return {
            "reply": crisis_text,
            "html": False,
            "crisis": True,
            "user_id": req.user_id,
            "conversation_id": None
        }

    # --- Get or create conversation ---
    conversation = None

    # If frontend passed a specific conversation_id, try to resume it
    if req.conversation_id:
        conversation = (
            db.query(Conversation)
            .filter(
                Conversation.conversation_id == req.conversation_id,
                Conversation.user_id == req.user_id
            )
            .first()
        )

    # Otherwise find the most recent conversation for this user
    if not conversation:
        conversation = (
            db.query(Conversation)
            .filter(Conversation.user_id == req.user_id)
            .order_by(Conversation.created_at.desc())
            .first()
        )

    # If still no conversation, create one
    if not conversation:
        conversation = Conversation(user_id=req.user_id)
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

    # Capture as plain int immediately — avoids DetachedInstanceError later
    conversation_id = conversation.conversation_id

    # --- Save user message FIRST ---
    # This ensures get_last_messages includes it naturally with no duplication
    user_msg = Message(
        conversation_id=conversation_id,
        role="user",
        content=req.message
    )
    db.add(user_msg)
    db.commit()

    # --- Build history AFTER saving (includes the new message) ---
    last_msgs = get_last_messages(db, conversation_id, limit=30)
    history = [
        {"role": m.role, "content": m.content}
        for m in last_msgs
    ]

    # --- Call model with full history (returns raw, unformatted text) ---
    raw_response = get_model_response(history)

    # --- Save raw response to DB (important: save raw, not formatted) ---
    bot_msg = Message(
        conversation_id=conversation_id,
        role="assistant",
        content=raw_response
    )
    db.add(bot_msg)
    db.commit()

    # --- Fetch relevant resources based on user message ---
    resources = get_resources(req.message)

    # --- Format response only for output, not for storage ---
    formatted_reply = format_response(raw_response)

    # Append resources to reply if any were found
    if resources:
        resource_lines = "\n\nHere are some resources that might help:"
        for r in resources:
            resource_lines += f"\n- {r.get('name', '')}: {r.get('contact', r.get('url', ''))}"
        formatted_reply += resource_lines

    db.close()

    print("User ID:", req.user_id)
    print("Conversation ID:", conversation_id)
    print("History length:", len(history))

    return {
        "reply": formatted_reply,
        "html": req.html,
        "crisis": False,
        "user_id": req.user_id,
        "conversation_id": conversation_id
    }

