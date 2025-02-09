import jwt
import pytest

from backend.backend.token_service import TokenService

TEST_TOKEN_SECRET = "test_secret"
TEST_ALGORITHM = "HS256"


@pytest.fixture()
def token_service():
    return TokenService(TEST_TOKEN_SECRET, TEST_ALGORITHM)


def test_generate_token(token_service):
    token = token_service.generate_token("test_email")

    decoded = jwt.decode(token, TEST_TOKEN_SECRET, algorithms=[TEST_ALGORITHM])
    assert decoded["email"] == "test_email"


def test_decrypt_token(token_service):
    token = token_service.generate_token("test_email")

    decoded = token_service.decrypt_token(token)
    assert decoded["email"] == "test_email"
