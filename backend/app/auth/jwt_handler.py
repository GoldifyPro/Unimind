import os
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

SECRET_KEY  = os.getenv("SECRET_KEY", "unimind-secret-change-in-production")
ALGORITHM   = "HS256"
EXPIRE_DAYS = 7

security = HTTPBearer(auto_error=False)


def create_token(user_id: str, is_guest: bool) -> str:
    expire = datetime.utcnow() + timedelta(days=EXPIRE_DAYS)
    return jwt.encode(
        {"sub": user_id, "is_guest": is_guest, "exp": expire},
        SECRET_KEY,
        algorithm=ALGORITHM
    )


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> dict:
    """
    FastAPI dependency injected into any route that requires authentication.
    Returns {"user_id": str, "is_guest": bool}
    """
    if not credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload  = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id  = payload.get("sub")
        is_guest = payload.get("is_guest", False)
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        return {"user_id": user_id, "is_guest": is_guest}
    except JWTError:
        raise HTTPException(status_code=401, detail="Token expired or invalid")