from fastapi import APIRouter, Depends

# TODO: import what you need from auth_utils and schemas

from auth_utils import get_current_user
from schemas import EvaluateRequest, EvaluateResponse

router = APIRouter()


# TODO Day 5: implement the evaluate endpoint
# POST / — protected with Depends(get_current_user)
# Accepts EvaluateRequest
# Returns EvaluateResponse with a placeholder message

@router.post("/", response_model=EvaluateResponse)
def evaluate(request: EvaluateRequest, current_user: str = Depends(get_current_user)):
    return EvaluateResponse(
        result=f"Evaluation requested by {current_user}. ChatGPT integration coming in Stage 5."
    )