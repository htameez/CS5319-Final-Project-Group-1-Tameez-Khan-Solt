from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.schemas import UserProfileCreate, UserProfileResponse, UserProfileUpdate
from app.repositories.profile_repository import ProfileRepository

router = APIRouter(prefix="/profiles", tags=["profiles"])


@router.post("", response_model=UserProfileResponse)
def create_profile(profile_data: UserProfileCreate, db: Session = Depends(get_db)):
    return ProfileRepository.create(db, profile_data)


@router.get("/{profile_id}", response_model=UserProfileResponse)
def get_profile(profile_id: int, db: Session = Depends(get_db)):
    profile = ProfileRepository.get_by_id(db, profile_id)
    if not profile:
        raise HTTPException(status_code=404, detail="User profile not found")
    return profile


@router.put("/{profile_id}", response_model=UserProfileResponse)
def update_profile(profile_id: int, profile_data: UserProfileUpdate, db: Session = Depends(get_db)):
    profile = ProfileRepository.get_by_id(db, profile_id)
    if not profile:
        raise HTTPException(status_code=404, detail="User profile not found")
    return ProfileRepository.update(db, profile, profile_data)
