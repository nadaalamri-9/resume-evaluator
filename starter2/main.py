from fastapi import FastAPI

# TODO Day 5: import CORSMiddleware and configure it
# TODO Day 2: import and include auth and evaluate routers

app = FastAPI(title="Resume Evaluator API")




# TODO Day 5: add CORS middleware here
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# TODO Day 2: include routers
# app.include_router(auth.router, prefix="/auth", tags=["auth"])
# app.include_router(evaluate.router, prefix="/evaluate", tags=["evaluate"])


@app.get("/")
def root():
    return {"message": "Resume Evaluator API is running"}


# TODO Day 1: add these practice routes
# GET /ping  →  { "status": "ok" }
# GET /hello/{name}  →  { "message": "Hello, {name}!" }

@app.get("/ping")
def ping():
    return {"status": "ok"}


@app.get("/hello/{name}")
def hello(name: str):
    return {"message": f"Hello, {name}!"}
