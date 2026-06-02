from pydantic import BaseModel

# TODO Day 2: define these models
# RegisterRequest  — fields: email (str), password (str)
# LoginRequest     — fields: email (str), password (str)
# UserResponse     — fields: email (str), role (str)
# TokenResponse    — fields: access_token (str), token_type (str, default "bearer")
# EvaluateRequest  — fields: job_description (str), prompt (str, default "")
# EvaluateResponse — field:  result (str)

# TODO Day 3: tighten up the models
# - Change email fields to EmailStr
# - Add Field(min_length=8) to RegisterRequest.password
