from openai import OpenAI
from app.core.config import settings
from app.models.domain import UserProfile


client = OpenAI(api_key=settings.OPENAI_API_KEY)


class OpenAIService:
    @staticmethod
    def build_prompt(question: str, profile: UserProfile) -> str:
        return f"""
You are CareBot, a healthcare support chatbot.

Important rules:
- Provide general health guidance only.
- Do not diagnose medical conditions.
- Do not prescribe medication.
- Encourage consulting a licensed healthcare professional for serious concerns.
- Keep answers supportive, clear, and personalized.

User profile:
Name: {profile.full_name or "Not provided"}
Date of Birth: {profile.date_of_birth or "Not provided"}
Sex: {profile.sex or "Not provided"}
Contact Info: {profile.contact_info or "Not provided"}
Health Goals: {profile.health_goals or "Not provided"}
Weight: {profile.weight if profile.weight is not None else "Not provided"}
Current Medications: {profile.medications or "Not provided"}

User question:
{question}

Respond with personalized but general health guidance.
"""

    @staticmethod
    def generate_response(question: str, profile: UserProfile) -> str:
        prompt = OpenAIService.build_prompt(question, profile)

        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are CareBot, a healthcare support chatbot. "
                            "You provide general educational health guidance only."
                        )
                    },
                    {"role": "user", "content": prompt}
                ],
                temperature=0.4
            )

            content = response.choices[0].message.content
            if not content:
                return "Sorry, I could not generate a response at this time."

            return (
                content
                + "\n\nDisclaimer: This information is for general educational purposes "
                + "and is not a substitute for professional medical advice."
            )
        except Exception:
            return (
                "Sorry, I could not generate a response at this time. "
                "Please try again later."
            )