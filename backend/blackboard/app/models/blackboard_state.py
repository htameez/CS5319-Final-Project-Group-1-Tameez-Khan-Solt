from dataclasses import dataclass, field


@dataclass
class BlackboardState:
    name: str
    question: str
    context: str | None = None
    safety: str | None = None
    draft_response: str | None = None
    final_response: str | None = None
    trace: list[str] = field(default_factory=list)