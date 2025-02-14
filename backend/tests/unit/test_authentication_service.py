from unittest.mock import patch, MagicMock

import pytest

from backend.backend.authentication_service import AuthenticationService
from backend.backend.models.user import UserRequest

@pytest.mark.parametrize("get_user_return_val, expected_result",
                         [
                            ([], False),
                            ([("some_email", "some_password")], True),
                         ])
def test__user_exists(get_user_return_val, expected_result):
    with patch('backend.backend.authentication_service.UserManagerService') as MockUserManagerService:
        mock_user_manager_service = MockUserManagerService.return_value
        mock_user_manager_service.get_user = MagicMock(return_value=get_user_return_val)

        auth_service = AuthenticationService()

        result = auth_service._user_exists("some_email")
        assert result == expected_result

def test_create_user_raises_http_exception_if_user_exists():
    with patch('backend.backend.authentication_service.UserManagerService') as MockUserManagerService:
        mock_user_manager_service = MockUserManagerService.return_value
        mock_user_manager_service.get_user = MagicMock(return_value=[("some_email", "some_password")])

        auth_service = AuthenticationService()

        with pytest.raises(Exception):
            auth_service.create_user("some_email")

def test_create_user():
    with (patch('backend.backend.authentication_service.UserManagerService') as MockUserManagerService,
          patch('backend.backend.authentication_service.TokenService') as MockTokenService):
        mock_user_manager_service = MockUserManagerService.return_value
        mock_user_manager_service.get_user = MagicMock(return_value=[])

        mock_token_service = MockTokenService.return_value
        mock_token_service.generate_token = MagicMock(return_value="some_token")

        auth_service = AuthenticationService()

        result = auth_service.create_user(UserRequest(email="some_email@gmail.com", password="10charpass"))
        assert result == {"token": "some_token"}

