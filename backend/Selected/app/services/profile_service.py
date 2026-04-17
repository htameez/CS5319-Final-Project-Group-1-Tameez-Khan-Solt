from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.schemas import UserProfileCreate, UserProfileUpdate
from app.repositories.profile_repository import ProfileRepository


class ProfileService:
    @staticmethod
    def create_profile(db: Session, profile_data: UserProfileCreate):
        if profile_data.weight is not None and profile_data.weight < 0:
            raise HTTPException(status_code=400, detail="Weight cannot be negative")
        return ProfileRepository.create(db, profile_data)

    @staticmethod
    def get_profile(db: Session, profile_id: int):
        profile = ProfileRepository.get_by_id(db, profile_id)
        if not profile:
            raise HTTPException(status_code=404, detail="User profile not found")
        return profile

    @staticmethod
    def update_profile(db: Session, profile_id: int, profile_data: UserProfileUpdate):
        if profile_data.weight is not None and profile_data.weight < 0:
            raise HTTPException(status_code=400, detail="Weight cannot be negative")

        profile = ProfileRepository.get_by_id(db, profile_id)
        if not profile:
            raise HTTPException(status_code=404, detail="User profile not found")

        return ProfileRepository.update(db, profile, profile_data)
    