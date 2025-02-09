from fastapi import APIRouter, status

from backend.backend.models.user import UserRequest

from backend.backend.authentication_service import AuthenticationService

router = APIRouter()
authentication_service = AuthenticationService()


@router.post("/v1/create", status_code=status.HTTP_201_CREATED)
async def create_user(
        user: UserRequest
) -> dict:
    return authentication_service.create_user(user)
