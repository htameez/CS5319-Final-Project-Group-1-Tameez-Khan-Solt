from typing import Optional

from sqlalchemy.orm import Session
from app.models.domain import ChatMessage


class ChatRepository:
    @staticmethod
    def create(db: Session, user_profile_id: int, user_question: str, ai_response: str) -> ChatMessage:
        chat = ChatMessage(
            user_profile_id=user_profile_id,
            user_question=user_question,
            ai_response=ai_response
        )
        db.add(chat)
        db.commit()
        db.refresh(chat)
        return chat

    @staticmethod
    def get_by_id(db: Session, chat_message_id: int) -> Optional[ChatMessage]:
        return db.query(ChatMessage).filter(ChatMessage.id == chat_message_id).first()

    @staticmethod
    def get_by_user(db: Session, user_profile_id: int):
        return (
            db.query(ChatMessage)
            .filter(ChatMessage.user_profile_id == user_profile_id)
            .order_by(ChatMessage.created_at.desc())
            .all()
        )
    
