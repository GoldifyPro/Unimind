"""
All Pydantic request/response schemas.
Import from here in all route files.
"""

from pydantic import BaseModel, EmailStr
from typing import Optional, List


# ─── Auth ────────────────────────────────────────────────────────────────────
class RegisterRequest(BaseModel):
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    is_guest: bool


# ─── Chat ────────────────────────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str
    html: bool = False
    user_id: Optional[str] = None
    conversation_id: Optional[int] = None

class ChatResponse(BaseModel):
    reply: str
    html: bool
    crisis: bool
    user_id: str
    conversation_id: Optional[int]


# ─── Mood ────────────────────────────────────────────────────────────────────
class MoodRequest(BaseModel):
    mood: str                    # great | good | okay | low | struggling
    note: Optional[str] = None

class MoodResponse(BaseModel):
    id: int
    mood: str
    note: Optional[str]
    created_at: str


# ─── Breathing ───────────────────────────────────────────────────────────────
class BreathingRequest(BaseModel):
    technique: str = "4-7-8"
    cycles_completed: int
    duration_seconds: int

class BreathingResponse(BaseModel):
    id: int
    technique: str
    cycles_completed: int
    duration_seconds: int
    created_at: str