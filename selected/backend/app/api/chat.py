from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.schemas import ChatRequest, ChatResponse, ChatMessageResponse
from app.services.chat_service import ChatService

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post("/", response_model=ChatResponse)
def ask_question(request: ChatRequest, db: Session = Depends(get_db)):
    return ChatService.ask_question(db, request)


@router.get("/history/{user_profile_id}", response_model=list[ChatMessageResponse])
def get_chat_history(user_profile_id: int, db: Session = Depends(get_db)):
    return ChatService.get_chat_history(db, user_profile_id)