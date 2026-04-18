from sqlalchemy import create_engine, Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime

DATABASE_URL = "sqlite:///./unimind.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# ─── DB dependency (used in all routes) ─────────────────────────────────────
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ─── Tables ──────────────────────────────────────────────────────────────────

class User(Base):
    __tablename__ = "users"
    id            = Column(Integer, primary_key=True, index=True)
    user_id       = Column(String, unique=True, index=True, nullable=False)
    email         = Column(String, unique=True, nullable=True)
    password_hash = Column(String, nullable=True)
    is_guest      = Column(Boolean, default=False)
    created_at    = Column(DateTime, default=datetime.utcnow)


class Conversation(Base):
    __tablename__ = "conversations"
    conversation_id = Column(Integer, primary_key=True, index=True)
    user_id         = Column(String, index=True)
    created_at      = Column(DateTime, default=datetime.utcnow)
    messages        = relationship("Message", back_populates="conversation")


class Message(Base):
    __tablename__ = "messages"
    message_id      = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.conversation_id"))
    role            = Column(String)   # 'user' or 'assistant'
    content         = Column(Text)
    timestamp       = Column(DateTime, default=datetime.utcnow)
    conversation    = relationship("Conversation", back_populates="messages")


class MoodCheckin(Base):
    __tablename__ = "mood_checkins"
    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(String, index=True)
    mood       = Column(String)   # great | good | okay | low | struggling
    note       = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class BreathingSession(Base):
    __tablename__ = "breathing_sessions"
    id                = Column(Integer, primary_key=True, index=True)
    user_id           = Column(String, index=True)
    technique         = Column(String, default="4-7-8")
    cycles_completed  = Column(Integer, default=0)
    duration_seconds  = Column(Integer, default=0)
    created_at        = Column(DateTime, default=datetime.utcnow)


class CrisisLog(Base):
    __tablename__ = "crisis_logs"
    id               = Column(Integer, primary_key=True, index=True)
    user_id          = Column(String, nullable=True)
    message_snippet  = Column(Text)
    triggered_at     = Column(DateTime, default=datetime.utcnow)


def init_db():
    Base.metadata.create_all(bind=engine)
    print("✅ Database initialized")