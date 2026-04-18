import uuid
import bcrypt
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.data.database import get_db, User
from app.auth.jwt_handler import create_token
from app.models.schemas import RegisterRequest, LoginRequest, AuthResponse

router = APIRouter(prefix="/api/auth", tags=["Auth"])


@router.post("/guest", response_model=AuthResponse)
def guest_login(db: Session = Depends(get_db)):
    """No email needed — create an anonymous guest session instantly."""
    guest_id = f"guest_{uuid.uuid4().hex[:12]}"
    db.add(User(user_id=guest_id, is_guest=True))
    db.commit()
    return {
        "access_token": create_token(guest_id, is_guest=True),
        "user_id": guest_id,
        "is_guest": True
    }


@router.post("/register", response_model=AuthResponse)
def register(body: RegisterRequest, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == body.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    user_id = f"user_{uuid.uuid4().hex[:12]}"
    hashed  = bcrypt.hashpw(body.password.encode(), bcrypt.gensalt()).decode()
    db.add(User(user_id=user_id, email=body.email, password_hash=hashed, is_guest=False))
    db.commit()

    return {
        "access_token": create_token(user_id, is_guest=False),
        "user_id": user_id,
        "is_guest": False
    }


@router.post("/login", response_model=AuthResponse)
def login(body: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == body.email).first()
    if not user or not bcrypt.checkpw(body.password.encode(), user.password_hash.encode()):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {
        "access_token": create_token(user.user_id, is_guest=False),
        "user_id": user.user_id,
        "is_guest": False
    }