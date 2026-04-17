from dataclasses import dataclass, field


@dataclass
class BlackboardState:
    name: str
    question: str
    context: str | None = None
    safety: str | None = None
    draft_response: str | None = None
    final_response: str | None = None
    profile: dict | None = None
    favorites: list[str] = field(default_factory=list)
    trace: list[str] = field(default_factory=list)