from pydantic import BaseModel, Field, EmailStr

# TODO Day 2: define these models
# RegisterRequest  — fields: email (str), password (str)
# LoginRequest     — fields: email (str), password (str)
# UserResponse     — fields: email (str), role (str)
# TokenResponse    — fields: access_token (str), token_type (str, default "bearer")
# EvaluateRequest  — fields: job_description (str), prompt (str, default "")
# EvaluateResponse — field:  result (str)

from pydantic import BaseModel


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    email: str
    role: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class EvaluateRequest(BaseModel):
    job_description: str
    prompt: str = ""


class EvaluateResponse(BaseModel):
    result: str

# TODO Day 3: tighten up the models
# - Change email fields to EmailStr
# - Add Field(min_length=8) to RegisterRequest.password
