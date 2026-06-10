from sqlmodel import SQLModel, create_engine, Session

# TODO Day 2: create the engine and database functions

DATABASE_URL = "sqlite:///./resume_evaluator.db"
engine = create_engine(DATABASE_URL, echo=True)

def create_db():
    """Creates all tables defined by SQLModel models. Safe to call multiple times."""
    SQLModel.metadata.create_all(engine)

def get_session():
    """FastAPI dependency — provides a DB session and closes it when done."""
    with Session(engine) as session:
        yield session