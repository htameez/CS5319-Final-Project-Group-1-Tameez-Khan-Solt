from pydantic import BaseModel


class ChatRequest(BaseModel):
    name: str
    question: str


class ChatResponse(BaseModel):
    trace: list[str]
    response: str