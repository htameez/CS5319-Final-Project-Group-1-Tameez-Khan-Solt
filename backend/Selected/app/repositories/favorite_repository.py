from sqlalchemy.orm import Session
from app.models.domain import FavoriteMessage


class FavoriteRepository:
    @staticmethod
    def create(db: Session, user_profile_id: int, chat_message_id: int, ai_response: str) -> FavoriteMessage:
        favorite = FavoriteMessage(
            user_profile_id=user_profile_id,
            chat_message_id=chat_message_id,
            ai_response=ai_response
        )
        db.add(favorite)
        db.commit()
        db.refresh(favorite)
        return favorite

    @staticmethod
    def get_by_user_and_chat(db: Session, user_profile_id: int, chat_message_id: int):
        return (
            db.query(FavoriteMessage)
            .filter(FavoriteMessage.user_profile_id == user_profile_id)
            .filter(FavoriteMessage.chat_message_id == chat_message_id)
            .first()
        )

    @staticmethod
    def get_by_user(db: Session, user_profile_id: int):
        return (
            db.query(FavoriteMessage)
            .filter(FavoriteMessage.user_profile_id == user_profile_id)
            .order_by(FavoriteMessage.created_at.desc())
            .all()
        )

    @staticmethod
    def delete(db: Session, favorite_id: int) -> bool:
        favorite = db.query(FavoriteMessage).filter(FavoriteMessage.id == favorite_id).first()
        if not favorite:
            return False
        db.delete(favorite)
        db.commit()
        return True
    
