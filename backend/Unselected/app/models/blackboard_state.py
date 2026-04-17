from dataclasses import dataclass, field
from typing import Dict, List, Optional


@dataclass
class BlackboardState:
    name: Optional[str]
    question: str
    user_profile_id: Optional[int] = None
    health_goals: Optional[str] = None
    medications: Optional[str] = None
    chat_message_id: Optional[int] = None
    normalized_question: Optional[str] = None
    context: Optional[str] = None
    safety: Optional[str] = None
    draft_response: Optional[str] = None
    final_response: Optional[str] = None
    profile: Optional[Dict[str, Optional[str]]] = None
    favorites: List[str] = field(default_factory=list)
    trace: List[str] = field(default_factory=list)
