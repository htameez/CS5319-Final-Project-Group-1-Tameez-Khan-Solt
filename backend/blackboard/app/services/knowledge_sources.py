from sqlalchemy.orm import Session

from openai import OpenAI

from app.core.config import settings
from app.models.blackboard_state import BlackboardState
from app.models.schemas import UserProfileCreate, UserProfileUpdate
from app.repositories.chat_repository import ChatRepository
from app.repositories.profile_repository import ProfileRepository


def user_input_processor_knowledge_source(state: BlackboardState) -> None:
    state.normalized_question = state.question.strip()
    if state.name:
        state.name = state.name.strip()
    if state.health_goals:
        state.health_goals = state.health_goals.strip()
    if state.medications:
        state.medications = state.medications.strip()

    state.trace.append("User input processor normalized the incoming request.")


def profile_knowledge_source(state: BlackboardState, db: Session) -> None:
    profile_record = None

    if state.user_profile_id is not None:
        profile_record = ProfileRepository.get_by_id(db, state.user_profile_id)

    if profile_record is None and state.name:
        profile_record = ProfileRepository.get_by_name(db, state.name)

    if profile_record is None:
        display_name = state.name or "Guest User"
        health_goals = state.health_goals or "General wellness support"
        medications = state.medications or "None listed"
        profile_record = ProfileRepository.create(
            db,
            UserProfileCreate(
                full_name=display_name,
                health_goals=health_goals,
                medications=medications,
            ),
        )
        state.trace.append(
            f'Profile loader created a new profile record for "{display_name}".'
        )
    else:
        requested_health_goals = state.health_goals or profile_record.health_goals
        requested_medications = state.medications or profile_record.medications

        if (
            requested_health_goals != profile_record.health_goals
            or requested_medications != profile_record.medications
        ):
            profile_record = ProfileRepository.update(
                db,
                profile_record,
                UserProfileUpdate(
                    full_name=profile_record.full_name,
                    date_of_birth=profile_record.date_of_birth,
                    sex=profile_record.sex,
                    contact_info=profile_record.contact_info,
                    health_goals=requested_health_goals,
                    weight=profile_record.weight,
                    medications=requested_medications,
                ),
            )
            state.trace.append(
                f"Profile loader updated profile #{profile_record.id} from the shared knowledge space."
            )
        else:
            state.trace.append(
                f'Profile loader fetched profile #{profile_record.id} from the database.'
            )

    if not state.health_goals:
        state.health_goals = profile_record.health_goals
    if not state.medications:
        state.medications = profile_record.medications

    state.user_profile_id = profile_record.id
    state.name = profile_record.full_name
    state.profile = {
        "name": profile_record.full_name,
        "goals": profile_record.health_goals or "General wellness support",
        "medications": profile_record.medications or "None listed",
        "weight": str(profile_record.weight) if profile_record.weight is not None else None,
    }

def context_knowledge_source(state: BlackboardState) -> None:
    question = (state.normalized_question or state.question).lower()

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
    goals = profile.get("goals") or "General wellness support"
    medications = profile.get("medications") or "None listed"
    weight = profile.get("weight") or "Not provided"

    prompt = f"""
You are a wellness assistant for a healthcare chatbot.
User name: {state.name}
Question: {state.normalized_question or state.question}
Detected context: {state.context}
Goals: {goals}
Medications: {medications}
Weight: {weight}

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


def chat_history_writer_knowledge_source(state: BlackboardState, db: Session) -> None:
    if state.user_profile_id is None or state.final_response is None:
        return

    chat = ChatRepository.create(
        db,
        user_profile_id=state.user_profile_id,
        user_question=state.normalized_question or state.question,
        ai_response=state.final_response,
    )
    state.chat_message_id = chat.id
    state.trace.append(
        f"Shared knowledge space persisted the finished response as chat #{chat.id}."
    )


def favorites_knowledge_source(state: BlackboardState) -> None:
    if state.chat_message_id is not None:
        state.trace.append(
            "Favorites manager is available to save this response through the favorites API."
        )
