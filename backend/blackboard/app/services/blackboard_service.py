from app.core.controller import run_blackboard_cycle
from app.models.blackboard_state import BlackboardState
from app.models.schemas import ChatRequest, ChatResponse


def process_chat(request: ChatRequest) -> ChatResponse:
    state = BlackboardState(name=request.name, question=request.question)
    result = run_blackboard_cycle(state)

    return ChatResponse(
        trace=result.trace,
        response=result.final_response or "No response generated."
    )