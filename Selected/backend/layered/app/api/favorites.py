from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.schemas import FavoriteRequest, FavoriteResponse
from app.services.favorite_service import FavoriteService

router = APIRouter(prefix="/favorites", tags=["Favorites"])


@router.post("/", response_model=FavoriteResponse)
def save_favorite(request: FavoriteRequest, db: Session = Depends(get_db)):
    return FavoriteService.save_favorite(db, request)


@router.get("/{user_profile_id}", response_model=list[FavoriteResponse])
def get_favorites(user_profile_id: int, db: Session = Depends(get_db)):
    return FavoriteService.get_favorites(db, user_profile_id)


@router.delete("/{favorite_id}")
def delete_favorite(favorite_id: int, db: Session = Depends(get_db)):
    return FavoriteService.delete_favorite(db, favorite_id)