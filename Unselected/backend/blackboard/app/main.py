from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import Base, engine
from app.models import domain
from app.api.chat import router as chat_router
from app.api.profiles import router as profiles_router
from app.api.favorites import router as favorites_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Blackboard Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Blackboard backend is running"}

@app.get("/health")
def health():
    return {"status": "ok"}

app.include_router(chat_router)
app.include_router(profiles_router)
app.include_router(favorites_router)
