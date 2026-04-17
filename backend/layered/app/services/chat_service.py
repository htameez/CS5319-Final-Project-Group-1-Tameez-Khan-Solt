from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.schemas import ChatRequest
from app.repositories.profile_repository import ProfileRepository
from app.repositories.chat_repository import ChatRepository
from app.services.openai_service import OpenAIService


class ChatService:
    @staticmethod
    def ask_question(db: Session, request: ChatRequest):
        if not request.question.strip():
            raise HTTPException(status_code=400, detail="Question is required")

        profile = ProfileRepository.get_by_id(db, request.user_profile_id)
        if not profile:
            raise HTTPException(status_code=404, detail="User profile not found")

        ai_answer = OpenAIService.generate_response(request.question, profile)

        saved_chat = ChatRepository.create(
            db=db,
            user_profile_id=request.user_profile_id,
            user_question=request.question,
            ai_response=ai_answer
        )

        return {
            "chat_message_id": saved_chat.id,
            "answer": saved_chat.ai_response
        }

    @staticmethod
    def get_chat_history(db: Session, user_profile_id: int):
        return ChatRepository.get_by_user(db, user_profile_id)