from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from datetime import datetime
from app.ollama_client import get_model_response
from app.safety import check_crisis
from app.prompts import SYSTEM_PROMPT
from app.formatter import format_response

# -----------------------------
# DATABASE SETUP (SQLite)
# -----------------------------
DATABASE_URL = "sqlite:///./chat.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Conversation(Base):
    __tablename__ = "conversations"
    conversation_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    messages = relationship("Message", back_populates="conversation")

class Message(Base):
    __tablename__ = "messages"
    message_id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.conversation_id"))
    role = Column(String)  # 'user' or 'assistant'
    content = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)
    conversation = relationship("Conversation", back_populates="messages")

Base.metadata.create_all(bind=engine)

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

@app.get("/health")
def health():
    return {"status": "ok"}

class ChatRequest(BaseModel):
    message: str
    html: bool = False   # set to True to get HTML-formatted reply
    user_id: str         # added user_id for tracking memory

# -----------------------------
# HELPER FUNCTIONS
# -----------------------------
def get_last_messages(db, conversation_id: int, limit: int = 10):
    msgs = (
        db.query(Message)
        .filter(Message.conversation_id == conversation_id)
        .order_by(Message.timestamp.desc())
        .limit(limit)
        .all()
    )
    return msgs[::-1]  # oldest first

# -----------------------------
# CHAT ENDPOINT
# -----------------------------
@app.post("/chat")
def chat(req: ChatRequest):
    db = SessionLocal()

    # Check crisis first
    if check_crisis(req.message):
        crisis_text = (
            "I'm really sorry you're feeling this way.\n\n"
            "Please reach out to a trusted friend, family member, or campus counselor.\n\n"
            "Your safety matters."
        )
        return {
            "reply": crisis_text,
            "html": False,
            "crisis": True
        }

    # Get or create conversation for this user
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

    # Save user message
    user_msg = Message(
        conversation_id=conversation.conversation_id,
        role="user",
        content=req.message
    )
    db.add(user_msg)
    db.commit()

    # Fetch last N messages for context
    last_msgs = get_last_messages(db, conversation.conversation_id, limit=10)
    prompt_context = ""
    for m in last_msgs:
        role_prefix = "User: " if m.role == "user" else "Bot: "
        prompt_context += f"{role_prefix}{m.content}\n"

    # Call your LLaMA model (via existing get_model_response)
    # Here, we send full context, not just current message
    raw_response = get_model_response(prompt_context)

    # Save bot response
    bot_msg = Message(
        conversation_id=conversation.conversation_id,
        role="assistant",
        content=raw_response
    )
    db.add(bot_msg)
    db.commit()
    db.close()

    return {
        "reply": raw_response,
        "html": req.html,
        "crisis": False
    }