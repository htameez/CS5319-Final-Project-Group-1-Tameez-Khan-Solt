from typing import Optional, List
from pydantic import BaseModel, Field


class UserProfileCreate(BaseModel):
    full_name: str = Field(..., min_length=1)
    date_of_birth: Optional[str] = None
    sex: Optional[str] = None
    contact_info: Optional[str] = None
    health_goals: Optional[str] = None
    weight: Optional[float] = None
    medications: Optional[str] = None


class UserProfileUpdate(BaseModel):
    full_name: str = Field(..., min_length=1)
    date_of_birth: Optional[str] = None
    sex: Optional[str] = None
    contact_info: Optional[str] = None
    health_goals: Optional[str] = None
    weight: Optional[float] = None
    medications: Optional[str] = None


class UserProfileResponse(BaseModel):
    id: int
    full_name: str
    date_of_birth: Optional[str]
    sex: Optional[str]
    contact_info: Optional[str]
    health_goals: Optional[str]
    weight: Optional[float]
    medications: Optional[str]

    class Config:
        from_attributes = True


class ChatRequest(BaseModel):
    user_profile_id: int
    question: str = Field(..., min_length=1)


class ChatResponse(BaseModel):
    chat_message_id: int
    answer: str


class ChatMessageResponse(BaseModel):
    id: int
    user_profile_id: int
    user_question: str
    ai_response: str

    class Config:
        from_attributes = True


class FavoriteRequest(BaseModel):
    user_profile_id: int
    chat_message_id: int


class FavoriteResponse(BaseModel):
    id: int
    user_profile_id: int
    chat_message_id: int
    ai_response: str

    class Config:
        from_attributes = True

