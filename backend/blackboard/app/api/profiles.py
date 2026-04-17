from fastapi import APIRouter

router = APIRouter(prefix="/profiles", tags=["profiles"])


@router.get("")
def get_profiles():
    return {
        "profiles": [
            {
                "name": "Taylor Lee",
                "goals": ["Weight balance", "Better hydration"],
                "medications": ["Vitamin D"],
            }
        ]
    }