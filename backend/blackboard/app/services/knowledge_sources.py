from app.models.blackboard_state import BlackboardState


def profile_knowledge_source(state: BlackboardState) -> None:
    state.trace.append(f"Profile knowledge source loaded profile data for {state.name}.")


def context_knowledge_source(state: BlackboardState) -> None:
    question = state.question.lower()

    if "routine" in question:
        state.context = "daily routine improvement"
    elif "hydration" in question or "water" in question:
        state.context = "hydration support"
    elif "exercise" in question or "activity" in question:
        state.context = "activity planning"
    else:
        state.context = "general wellness"

    state.trace.append(
        f'Context knowledge source identified the topic as "{state.context}".'
    )


def safety_knowledge_source(state: BlackboardState) -> None:
    state.safety = (
        "This guidance is for general wellness support only and is not a medical diagnosis."
    )
    state.trace.append("Safety knowledge source added non-diagnostic guardrails.")


def wellness_planner_knowledge_source(state: BlackboardState) -> None:
    state.draft_response = (
        f"{state.name}, you can improve your routine this week by drinking more water, "
        f"keeping a consistent sleep schedule, and adding light daily movement."
    )
    state.trace.append("Wellness planner knowledge source created a draft response.")


def response_composer_knowledge_source(state: BlackboardState) -> None:
    state.final_response = f"{state.draft_response} {state.safety}"
    state.trace.append("Response composer knowledge source finalized the chatbot response.")