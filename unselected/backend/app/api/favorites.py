from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.schemas import FavoriteRequest, FavoriteResponse
from app.services.favorites_manager import FavoritesManager

router = APIRouter(prefix="/favorites", tags=["favorites"])


@router.get("/{user_profile_id}", response_model=list[FavoriteResponse])
def get_favorites(user_profile_id: int, db: Session = Depends(get_db)):
    return FavoritesManager.get_favorites(db, user_profile_id)


@router.post("", response_model=FavoriteResponse)
def add_favorite(request: FavoriteRequest, db: Session = Depends(get_db)):
    return FavoritesManager.save_favorite(db, request)
