from fastapi import APIRouter, Depends, HTTPException, status

from sqlmodel import Session, select
from database import get_session

from schemas import RegisterRequest, LoginRequest, UserResponse, TokenResponse
from models import User
from auth_utils import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
)

router = APIRouter()


# TODO Day 2: add placeholder register and login routes
# POST /register — accepts RegisterRequest, returns UserResponse with hardcoded role "user"
# POST /login    — accepts LoginRequest, returns TokenResponse with hardcoded token string

# TODO Day 3: add the email-already-exists check with HTTPException 400
#             update register to return status_code=201

# TODO Day 4: replace hardcoded responses with real logic
# - register: hash password, save to store
# - login: verify password, create and return real JWT
# - add GET /me using Depends(get_current_user)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    request: RegisterRequest,
    session: Session = Depends(get_session),
):
    existing = session.exec(
        select(User).where(User.email == request.email)
    ).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    user = User(
        email=request.email,
        hashed_password=hash_password(request.password),
        role="user",
    )
    session.add(user)
    session.commit()
    session.refresh(user)

    return UserResponse(email=user.email, role=user.role)


@router.post("/login", response_model=TokenResponse)
def login(
    request: LoginRequest,
    session: Session = Depends(get_session),
):
    user = session.exec(
        select(User).where(User.email == request.email)
    ).first()

    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    return TokenResponse(
        access_token=create_access_token(user.email),
    )


@router.get("/me", response_model=UserResponse)
def get_me(
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    user = session.exec(
        select(User).where(User.email == current_user)
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return UserResponse(
        email=user.email,
        role=user.role,
    )