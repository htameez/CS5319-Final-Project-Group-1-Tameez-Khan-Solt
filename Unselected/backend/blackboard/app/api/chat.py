from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.schemas import ChatRequest, ChatResponse
from app.services.blackboard_service import process_chat
from app.repositories.chat_repository import ChatRepository

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
def chat(request: ChatRequest, db: Session = Depends(get_db)) -> ChatResponse:
    return process_chat(request, db)


@router.get("/history/{user_profile_id}")
def get_chat_history(user_profile_id: int, db: Session = Depends(get_db)):
    return ChatRepository.get_by_user(db, user_profile_id)

@router.get("/demo")
def demo():
    return {
        "message": "Blackboard system ready",
        "components": [
            "Controller",
            "Knowledge Sources",
            "Shared Blackboard State",
            "AI Integration",
        ],
    }
