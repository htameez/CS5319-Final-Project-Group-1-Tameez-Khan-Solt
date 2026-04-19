from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import Base, engine
from app.api import profiles, chat, favorites

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CareBot Layered Backend",
    description="FastAPI backend for the layered architecture implementation of CareBot",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with frontend URL later if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(profiles.router, prefix="/api")
app.include_router(chat.router, prefix="/api")
app.include_router(favorites.router, prefix="/api")


@app.get("/")
def root():
    return {"message": "CareBot Layered Backend is running"}