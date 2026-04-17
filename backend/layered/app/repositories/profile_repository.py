from sqlalchemy.orm import Session
from app.models.domain import UserProfile
from app.models.schemas import UserProfileCreate, UserProfileUpdate


class ProfileRepository:
    @staticmethod
    def create(db: Session, profile_data: UserProfileCreate) -> UserProfile:
        profile = UserProfile(**profile_data.model_dump())
        db.add(profile)
        db.commit()
        db.refresh(profile)
        return profile

    @staticmethod
    def get_by_id(db: Session, profile_id: int) -> UserProfile | None:
        return db.query(UserProfile).filter(UserProfile.id == profile_id).first()

    @staticmethod
    def update(db: Session, profile: UserProfile, profile_data: UserProfileUpdate) -> UserProfile:
        for key, value in profile_data.model_dump().items():
            setattr(profile, key, value)
        db.commit()
        db.refresh(profile)
        return profile
    