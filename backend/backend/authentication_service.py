import os

from fastapi import HTTPException, status

from backend.backend.models.user import UserRequest
from backend.backend.token_service import TokenService

import bcrypt

from backend.backend.user_manager_service import UserManagerService

TOKEN_SECRET = os.environ.get("ZENHOME_TOKEN_SECRET", "test-secret")
TOKEN_ALGORITHM = os.environ.get("ZENHOME_TOKEN_ALGORITHM", "HS256")


class AuthenticationService:
    def __init__(self):
        self.token_service = TokenService(TOKEN_SECRET, TOKEN_ALGORITHM)
        self.user_manager_service = UserManagerService()
        self.user_manager_service.init_db()

    def create_user(self, new_user: UserRequest) -> dict:
        if self._user_exists(new_user.email):
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already exists")

        self._create_user(new_user)

        return {"token": self.token_service.generate_token(new_user.email)}

    def _user_exists(self, email: str) -> bool:
        return bool(self.user_manager_service.get_user(email))

    def _hash_password(self, new_user: UserRequest) -> bytes:
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(str.encode(new_user.password), salt)

        return hashed_password

    def _create_user(self, new_user: UserRequest) -> None:
        hashed_password = self._hash_password(new_user)
        self.user_manager_service.create_user(new_user.email, hashed_password)
