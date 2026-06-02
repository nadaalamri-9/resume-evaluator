from fastapi import APIRouter, Depends, HTTPException, status

# TODO: import what you need from auth_utils, schemas, store

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
