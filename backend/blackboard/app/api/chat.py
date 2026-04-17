from fastapi import APIRouter
from app.models.schemas import ChatRequest, ChatResponse
from app.services.blackboard_service import process_chat

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    return process_chat(request)

@router.get("/demo")
def demo():
    return {
        "message": "Blackboard system ready",
        "components": [
            "Controller",
            "Knowledge Sources",
            "Shared Blackboard State",
            "AI Integration",
        ],
    }