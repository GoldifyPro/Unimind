import uuid
from datetime import datetime
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from database import init_db, get_db
from auth import (
    get_current_user,
    create_guest_session,
    register_user,
    login_user
)
from models import (
    RegisterRequest, LoginRequest,
    MoodCheckinRequest,
    ChatMessageRequest,
    BreathingSessionRequest
)
from Unimind.backend.app.core.safety import check_crisis, get_crisis_response
from ollama_client import get_ai_response, check_ollama_health
import resources as resources_module

# ─── App setup ───────────────────────────────────────────
app = FastAPI(title="Unimind API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],  # Vite dev ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resources_module.router)

@app.on_event("startup")
def startup():
    init_db()
    print("🚀 Unimind backend started")

# ─── Health ──────────────────────────────────────────────
@app.get("/api/health")
async def health():
    ollama_ok = await check_ollama_health()
    return {
        "status": "ok",
        "ollama": "connected" if ollama_ok else "disconnected"
    }

# ─── Auth routes ─────────────────────────────────────────
@app.post("/api/auth/guest")
def guest_login():
    """Create an anonymous guest session."""
    return create_guest_session()

@app.post("/api/auth/register")
def register(body: RegisterRequest):
    return register_user(body.email, body.password)

@app.post("/api/auth/login")
def login(body: LoginRequest):
    return login_user(body.email, body.password)

# ─── Mood routes ─────────────────────────────────────────
@app.post("/api/mood")
def log_mood(body: MoodCheckinRequest, user=Depends(get_current_user)):
    valid_moods = ["great", "good", "okay", "low", "struggling"]
    if body.mood.lower() not in valid_moods:
        raise HTTPException(status_code=400, detail=f"Mood must be one of: {valid_moods}")

    conn = get_db()
    cursor = conn.execute(
        "INSERT INTO mood_checkins (user_id, mood, note) VALUES (?, ?, ?)",
        (user["user_id"], body.mood.lower(), body.note)
    )
    conn.commit()

    row = conn.execute(
        "SELECT * FROM mood_checkins WHERE id = ?", (cursor.lastrowid,)
    ).fetchone()
    conn.close()

    return {
        "id": row["id"],
        "mood": row["mood"],
        "note": row["note"],
        "created_at": row["created_at"]
    }

@app.get("/api/mood/history")
def get_mood_history(user=Depends(get_current_user)):
    if user["is_guest"]:
        return {"moods": [], "message": "Mood history is not saved for guests"}

    conn = get_db()
    rows = conn.execute(
        "SELECT * FROM mood_checkins WHERE user_id = ? ORDER BY created_at DESC LIMIT 30",
        (user["user_id"],)
    ).fetchall()
    conn.close()

    return {"moods": [dict(r) for r in rows]}

# ─── Chat routes ─────────────────────────────────────────
@app.post("/api/chat")
async def chat(body: ChatMessageRequest, user=Depends(get_current_user)):
    conn = get_db()

    # Create or get conversation
    if body.conversation_id:
        convo = conn.execute(
            "SELECT * FROM conversations WHERE conversation_id = ? AND user_id = ?",
            (body.conversation_id, user["user_id"])
        ).fetchone()
        if not convo:
            raise HTTPException(status_code=404, detail="Conversation not found")
        conversation_id = body.conversation_id
    else:
        conversation_id = str(uuid.uuid4())
        conn.execute(
            "INSERT INTO conversations (conversation_id, user_id) VALUES (?, ?)",
            (conversation_id, user["user_id"])
        )
        conn.commit()

    # Check for crisis BEFORE saving or calling AI
    is_crisis = check_crisis(body.message, user["user_id"])
    if is_crisis:
        conn.close()
        crisis_data = get_crisis_response()
        return {
            "conversation_id": conversation_id,
            "message_id": str(uuid.uuid4()),
            "role": "assistant",
            "content": crisis_data["message"],
            "created_at": datetime.utcnow().isoformat(),
            "is_crisis": True,
            "crisis_resources": crisis_data["resources"]
        }

    # Save user message
    user_msg_id = str(uuid.uuid4())
    conn.execute(
        "INSERT INTO messages (message_id, conversation_id, role, content) VALUES (?, ?, 'user', ?)",
        (user_msg_id, conversation_id, body.message)
    )
    conn.commit()

    # Get conversation history for context
    history_rows = conn.execute(
        "SELECT role, content FROM messages WHERE conversation_id = ? ORDER BY created_at ASC",
        (conversation_id,)
    ).fetchall()
    history = [{"role": r["role"], "content": r["content"]} for r in history_rows]

    # Get AI response
    ai_reply = await get_ai_response(body.message, history[:-1])  # exclude the just-saved msg

    # Save assistant message
    assistant_msg_id = str(uuid.uuid4())
    conn.execute(
        "INSERT INTO messages (message_id, conversation_id, role, content) VALUES (?, ?, 'assistant', ?)",
        (assistant_msg_id, conversation_id, ai_reply)
    )
    conn.commit()
    conn.close()

    return {
        "conversation_id": conversation_id,
        "message_id": assistant_msg_id,
        "role": "assistant",
        "content": ai_reply,
        "created_at": datetime.utcnow().isoformat(),
        "is_crisis": False
    }

@app.get("/api/chat/history/{conversation_id}")
def get_chat_history(conversation_id: str, user=Depends(get_current_user)):
    conn = get_db()

    convo = conn.execute(
        "SELECT * FROM conversations WHERE conversation_id = ? AND user_id = ?",
        (conversation_id, user["user_id"])
    ).fetchone()
    if not convo:
        raise HTTPException(status_code=404, detail="Conversation not found")

    messages = conn.execute(
        "SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC",
        (conversation_id,)
    ).fetchall()
    conn.close()

    return {
        "conversation_id": conversation_id,
        "messages": [dict(m) for m in messages]
    }

@app.get("/api/chat/conversations")
def get_conversations(user=Depends(get_current_user)):
    if user["is_guest"]:
        return {"conversations": []}

    conn = get_db()
    rows = conn.execute(
        "SELECT * FROM conversations WHERE user_id = ? ORDER BY created_at DESC",
        (user["user_id"],)
    ).fetchall()
    conn.close()
    return {"conversations": [dict(r) for r in rows]}

# ─── Breathing routes ────────────────────────────────────
@app.post("/api/breathe/session")
def log_breathing(body: BreathingSessionRequest, user=Depends(get_current_user)):
    conn = get_db()
    cursor = conn.execute(
        """INSERT INTO breathing_sessions (user_id, technique, cycles_completed, duration_seconds)
           VALUES (?, ?, ?, ?)""",
        (user["user_id"], body.technique, body.cycles_completed, body.duration_seconds)
    )
    conn.commit()

    row = conn.execute(
        "SELECT * FROM breathing_sessions WHERE id = ?", (cursor.lastrowid,)
    ).fetchone()
    conn.close()

    return dict(row)

@app.get("/api/breathe/history")
def get_breathing_history(user=Depends(get_current_user)):
    if user["is_guest"]:
        return {"sessions": []}

    conn = get_db()
    rows = conn.execute(
        "SELECT * FROM breathing_sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT 20",
        (user["user_id"],)
    ).fetchall()
    conn.close()
    return {"sessions": [dict(r) for r in rows]}

# ─── SOS route ───────────────────────────────────────────
@app.get("/api/sos")
def get_sos_resources():
    """Always-available emergency resources — no auth required."""
    return {
        "message": "You are not alone. Help is available right now.",
        "resources": [
            {"name": "National Suicide Prevention Lifeline", "phone": "988", "available": "24/7"},
            {"name": "Crisis Text Line", "instruction": "Text HOME to 741741", "available": "24/7"},
            {"name": "Emergency Services", "phone": "911", "available": "24/7"},
        ]
    }