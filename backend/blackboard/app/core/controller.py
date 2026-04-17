from app.models.blackboard_state import BlackboardState
from app.services.knowledge_sources import (
    context_knowledge_source,
    profile_knowledge_source,
    response_composer_knowledge_source,
    safety_knowledge_source,
    wellness_planner_knowledge_source,
)


def run_blackboard_cycle(state: BlackboardState) -> BlackboardState:
    profile_knowledge_source(state)
    context_knowledge_source(state)
    safety_knowledge_source(state)
    wellness_planner_knowledge_source(state)
    response_composer_knowledge_source(state)

    state.trace.append(f"Controller selected the final response for {state.name}.")
    return state