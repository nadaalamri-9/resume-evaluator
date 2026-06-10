from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from database import get_session
from models import User
from auth_utils import require_admin

router = APIRouter()


# GET /admin/users — return list of all users
@router.get("/users")
def list_users(
    admin: User = Depends(require_admin),
    session: Session = Depends(get_session),
):
    return session.exec(select(User)).all()

# PATCH /admin/users/{email}/role — update a user's role
@router.patch("/users/{email}/role")
def update_role(
    email: str,
    payload: dict,
    admin: User = Depends(require_admin),
    session: Session = Depends(get_session),
):
    user = session.exec(
        select(User).where(User.email == email)
    ).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    user.role = payload["role"]
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

# DELETE /admin/users/{email} — delete a user
@router.delete("/users/{email}")
def delete_user(
    email: str,
    admin: User = Depends(require_admin),
    session: Session = Depends(get_session),
):
    user = session.exec(
        select(User).where(User.email == email)
    ).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    session.delete(user)
    session.commit()
    return {"detail": "User deleted"}