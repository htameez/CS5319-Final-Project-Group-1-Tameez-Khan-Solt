from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.schemas import FavoriteRequest
from app.repositories.chat_repository import ChatRepository
from app.repositories.favorite_repository import FavoriteRepository


class FavoriteService:
    @staticmethod
    def save_favorite(db: Session, request: FavoriteRequest):
        chat = ChatRepository.get_by_id(db, request.chat_message_id)
        if not chat:
            raise HTTPException(status_code=404, detail="Chat message not found")

        if chat.user_profile_id != request.user_profile_id:
            raise HTTPException(status_code=400, detail="Chat message does not belong to this user")

        return FavoriteRepository.create(
            db=db,
            user_profile_id=request.user_profile_id,
            chat_message_id=request.chat_message_id,
            ai_response=chat.ai_response
        )

    @staticmethod
    def get_favorites(db: Session, user_profile_id: int):
        return FavoriteRepository.get_by_user(db, user_profile_id)

    @staticmethod
    def delete_favorite(db: Session, favorite_id: int):
        deleted = FavoriteRepository.delete(db, favorite_id)
        if not deleted:
            raise HTTPException(status_code=404, detail="Favorite not found")
        return {"message": "Favorite deleted successfully"}