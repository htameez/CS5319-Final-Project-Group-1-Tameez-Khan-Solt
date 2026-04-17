from sqlalchemy.orm import Session

from app.core.controller import run_blackboard_cycle
from app.models.blackboard_state import BlackboardState
from app.models.schemas import ChatRequest, ChatResponse


def process_chat(request: ChatRequest, db: Session) -> ChatResponse:
    state = BlackboardState(
        name=request.name,
        question=request.question,
        user_profile_id=request.user_profile_id,
        health_goals=request.health_goals,
        medications=request.medications,
    )
    result = run_blackboard_cycle(state, db)

    return ChatResponse(
        trace=result.trace,
        response=result.final_response or "No response generated.",
        user_profile_id=result.user_profile_id or 0,
        chat_message_id=result.chat_message_id or 0,
    )
