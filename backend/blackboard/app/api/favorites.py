from fastapi import APIRouter

router = APIRouter(prefix="/favorites", tags=["favorites"])


@router.get("")
def get_favorites():
    return {
        "favorites": [
            "Drink more water throughout the day.",
            "Maintain a consistent sleep schedule.",
        ]
    }