from datetime import datetime, timedelta

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = "dev-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


# TODO Day 4: implement these functions

def hash_password(password: str) -> str:
    """Hash a plain text password using bcrypt."""
    pass


def verify_password(plain: str, hashed: str) -> bool:
    """Return True if the plain password matches the hash."""
    pass


def create_access_token(email: str) -> str:
    """Create a signed JWT containing the user's email and an expiry time."""
    pass


def get_current_user(token: str = Depends(oauth2_scheme)) -> str:
    """
    FastAPI dependency — validates the JWT and returns the user's email.
    Raises 401 if the token is invalid or expired.
    """
    pass
