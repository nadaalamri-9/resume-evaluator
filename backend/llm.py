import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def evaluate_resume(job_description: str, prompt: str, resume_text: str) -> str:

    system_prompt = (
    "You are an expert HR assistant. "
    "Evaluate how well the candidate matches the job requirements. "
    "Return the response in plain text only. "
    "Do not use markdown formatting. "
    "Do not use **, #, or any markdown symbols. "
    "Use this exact structure:\n\n"
    "Match Score:\n"
    "0-10 score\n\n"
    "Key Strengths:\n"
    "- strength 1\n"
    "- strength 2\n\n"
    "Gaps:\n"
    "- gap 1\n"
    "- gap 2\n\n"
    "Overall Recommendation:\n"
    "short recommendation"
)


    user_message = (
        f"Job Description:\n{job_description}\n\n"
        f"Resume:\n{resume_text}\n\n"
        f"Additional instructions:\n{prompt}"
    )


    response = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message},
        ],
        max_tokens=500,
    )


    return response.choices[0].message.content