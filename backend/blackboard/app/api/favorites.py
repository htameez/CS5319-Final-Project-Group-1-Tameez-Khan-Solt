from fastapi import APIRouter

router = APIRouter(prefix="/favorites", tags=["favorites"])

favorites_store = []


@router.get("")
def get_favorites():
    return {"favorites": favorites_store}


@router.post("")
def add_favorite(item: str):
    favorites_store.append(item)
    return {"message": "added", "favorites": favorites_store}