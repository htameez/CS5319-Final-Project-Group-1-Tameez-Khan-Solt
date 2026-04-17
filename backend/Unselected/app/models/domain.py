from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.sql import func

from app.db.database import Base


class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    date_of_birth = Column(String(50), nullable=True)
    sex = Column(String(50), nullable=True)
    contact_info = Column(String(255), nullable=True)
    health_goals = Column(Text, nullable=True)
    weight = Column(Float, nullable=True)
    medications = Column(Text, nullable=True)


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    user_profile_id = Column(Integer, ForeignKey("user_profiles.id"), nullable=False)
    user_question = Column(Text, nullable=False)
    ai_response = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class FavoriteMessage(Base):
    __tablename__ = "favorite_messages"

    id = Column(Integer, primary_key=True, index=True)
    user_profile_id = Column(Integer, ForeignKey("user_profiles.id"), nullable=False)
    chat_message_id = Column(Integer, ForeignKey("chat_messages.id"), nullable=False)
    ai_response = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
