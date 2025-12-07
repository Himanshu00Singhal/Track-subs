from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.auth import router as auth_router

app = FastAPI(title="Security Service")

# CORS
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "*", # Allow all origins for Cloudflare Tunnel
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth")

if __name__ == "__main__":
    import uvicorn
    # Running on port 8001 to avoid conflict with main backend (8000)
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
