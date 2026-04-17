from fastapi import APIRouter

router = APIRouter(prefix="/profiles", tags=["profiles"])

fake_profile = {
    "name": "Grant",
    "goals": ["More energy", "Better sleep"],
    "medications": ["None"],
}


@router.get("")
def get_profile():
    return fake_profile