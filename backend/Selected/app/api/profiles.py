from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.schemas import UserProfileCreate, UserProfileUpdate, UserProfileResponse
from app.services.profile_service import ProfileService

router = APIRouter(prefix="/profiles", tags=["Profiles"])


@router.post("/", response_model=UserProfileResponse)
def create_profile(profile_data: UserProfileCreate, db: Session = Depends(get_db)):
    return ProfileService.create_profile(db, profile_data)


@router.get("/{profile_id}", response_model=UserProfileResponse)
def get_profile(profile_id: int, db: Session = Depends(get_db)):
    return ProfileService.get_profile(db, profile_id)


@router.put("/{profile_id}", response_model=UserProfileResponse)
def update_profile(profile_id: int, profile_data: UserProfileUpdate, db: Session = Depends(get_db)):
    return ProfileService.update_profile(db, profile_id, profile_data)