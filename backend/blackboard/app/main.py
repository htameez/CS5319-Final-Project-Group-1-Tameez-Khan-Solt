from fastapi import FastAPI
from app.api.chat import router as chat_router
from app.api.profiles import router as profiles_router
from app.api.favorites import router as favorites_router

app = FastAPI(title="Blackboard Backend")

@app.get("/")
def root():
    return {"message": "Blackboard backend is running"}

@app.get("/health")
def health():
    return {"status": "ok"}

app.include_router(chat_router)
app.include_router(profiles_router)
app.include_router(favorites_router)