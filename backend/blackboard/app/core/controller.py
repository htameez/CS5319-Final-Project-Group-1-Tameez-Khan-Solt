from sqlalchemy.orm import Session

from app.models.blackboard_state import BlackboardState
from app.services.knowledge_sources import (
    ai_response_knowledge_source,
    chat_history_writer_knowledge_source,
    context_knowledge_source,
    favorites_knowledge_source,
    profile_knowledge_source,
    response_composer_knowledge_source,
    safety_knowledge_source,
    user_input_processor_knowledge_source,
)


def run_blackboard_cycle(state: BlackboardState, db: Session) -> BlackboardState:
    while state.final_response is None:
        if state.normalized_question is None:
            user_input_processor_knowledge_source(state)
            continue

        if state.profile is None:
            profile_knowledge_source(state, db)
            continue

        if state.context is None:
            context_knowledge_source(state)
            continue

        if state.safety is None:
            safety_knowledge_source(state)
            continue

        if state.draft_response is None:
            ai_response_knowledge_source(state)
            continue

        if state.final_response is None:
            response_composer_knowledge_source(state)
            continue

    if state.chat_message_id is None:
        chat_history_writer_knowledge_source(state, db)

    favorites_knowledge_source(state)
    state.trace.append(f"Controller selected the final response for {state.name}.")
    return state
