from fastapi import APIRouter, Depends, UploadFile, File, Form

from auth_utils import get_current_user
from schemas import EvaluateResponse
from pdf_utils import extract_text_from_pdf
from llm import evaluate_resume

router = APIRouter()


@router.post("/", response_model=EvaluateResponse)
def evaluate(
    job_description: str = Form(...),
    prompt: str = Form(""),
    resume: UploadFile = File(...),
    current_user: str = Depends(get_current_user),
):
    # 1) extract the text from the uploaded PDF
    resume_text = extract_text_from_pdf(resume.file)

    # 2) send everything to ChatGPT and get the evaluation
    result = evaluate_resume(
        job_description=job_description,
        prompt=prompt,
        resume_text=resume_text,
    )

    # 3) return the real result
    return EvaluateResponse(result=result)