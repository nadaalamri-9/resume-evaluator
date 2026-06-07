from models import User
from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = "sqlite:///./resume_evaluator.db"

engine = create_engine(DATABASE_URL, echo=True)


def create_db():
    """Creates all tables defined by SQLModel models."""
    SQLModel.metadata.create_all(engine)


def get_session():
    """Provides a database session and closes it when done."""
    with Session(engine) as session:
        yield session