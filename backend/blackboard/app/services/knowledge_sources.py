from openai import OpenAI

from app.core.config import settings
from app.models.blackboard_state import BlackboardState


def profile_knowledge_source(state: BlackboardState) -> None:
    # Simulate pulling from database/API
    state.profile = {
        "name": state.name,
        "goals": ["Build muscle", "Better sleep"],
        "medications": ["None"],
    }

    state.trace.append(
        f"Profile knowledge source loaded profile data for {state.name}."
    )

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


def ai_response_knowledge_source(state: BlackboardState) -> None:
    if not settings.openai_api_key:
        state.draft_response = (
            f"{state.name}, you can improve your routine this week by drinking more water, "
            f"keeping a consistent sleep schedule, and adding light daily movement."
        )
        state.trace.append(
            "AI response knowledge source used fallback response because no API key was configured."
        )
        return

    client = OpenAI(api_key=settings.openai_api_key)

    profile = state.profile or {}
    goals = ", ".join(profile.get("goals", []))
    medications = ", ".join(profile.get("medications", []))

    prompt = f"""
You are a wellness assistant for a healthcare chatbot.
User name: {state.name}
Question: {state.question}
Detected context: {state.context}
Goals: {goals}
Medications: {medications}

Give a short, helpful wellness response.
Do not diagnose.
Keep it under 120 words.
"""

    response = client.responses.create(
        model="gpt-4.1-mini",
        input=prompt,
    )

    state.draft_response = response.output_text.strip()
    state.trace.append("AI response knowledge source generated a draft response.")


def response_composer_knowledge_source(state: BlackboardState) -> None:
    state.final_response = f"{state.draft_response} {state.safety}"
    state.trace.append("Response composer knowledge source finalized the chatbot response.")

def favorites_knowledge_source(state: BlackboardState) -> None:
    # Example: mark response as favorite automatically (demo)
    if state.final_response:
        state.trace.append("Favorites knowledge source could store this response.")