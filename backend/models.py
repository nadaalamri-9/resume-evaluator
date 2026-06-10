from typing import Optional
from sqlmodel import SQLModel, Field

# TODO Day 3: define the User model

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    role: str = "user"