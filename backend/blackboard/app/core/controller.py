from app.models.blackboard_state import BlackboardState
from app.services.knowledge_sources import (
    context_knowledge_source,
    profile_knowledge_source,
    response_composer_knowledge_source,
    safety_knowledge_source,
    wellness_planner_knowledge_source,
)


def run_blackboard_cycle(state: BlackboardState) -> BlackboardState:
    while state.final_response is None:

        if state.context is None:
            context_knowledge_source(state)
            continue

        if state.safety is None:
            safety_knowledge_source(state)
            continue

        if state.draft_response is None:
            wellness_planner_knowledge_source(state)
            continue

        if state.final_response is None:
            response_composer_knowledge_source(state)
            continue

    state.trace.append(f"Controller selected the final response for {state.name}.")
    return state