import pytest
from pydantic import ValidationError

from backend.backend.models.user import UserRequest, UpdateUserRequest


@pytest.mark.parametrize("model_input, expected_error", [
    ({"email": "non_matching_email@somedomain.co.uk", "password": "thisismypassword"}, "email"),
    ({"email": "invalid_chars$£!@outlook.co.uk", "password": "thisismypassword"}, "email"),
    ({"email": 12345, "password": "thisismypassword"}, "email"),
    ({"email": "valid_email@outlook.co.uk", "password": "short"}, "password"),
    ({"email": "valid_email@outlook.co.uk", "password": "waytoolongitisabove40characterswaytoolongitisabove40characters"}, "password"),
    ({"email": "valid_email@outlook.co.uk", "password": "inval£dcharacters!"}, "password"),
    ({"email": "valid_email@outlook.co.uk", "password": 12345}, "password"),
    ({"email": "valid_email@outlook.co.uk", "password": "10charpass", "extra_field":"some_value!"}, "Extra inputs are not permitted"),
])
def test_user_model_raises_error(model_input, expected_error):
    with pytest.raises(ValidationError) as excinfo:
        UserRequest(**model_input)

    assert expected_error in str(excinfo)

@pytest.mark.parametrize("model_input", [
    ({"email": "valid_email@outlook.co.uk", "password": "10charpass"}),
    ({"email": "valid_email@gmail.com", "password": "40charpass40charpass40charpass40charpass"}),
])
def test_user_model(model_input):
    user = UserRequest(**model_input)

    assert user.email == model_input.get("email")
    assert user.password == model_input.get("password")

@pytest.mark.parametrize("model_input, expected_error", [
    ({"email": "valid_email@gmail.com", "password": "10charpass", "new_password": "short"}, "password"),
    ({"email": "valid_email@gmail.com", "password": "10charpass", "new_password": "waytoolongitisabove40characterswaytoolongitisabove40characters"}, "password"),
    ({"email": "valid_email@gmail.com", "password": "10charpass", "new_password": "inval£dcharacters!"}, "password"),
    ({"email": "valid_email@gmail.com", "password": "10charpass", "new_password": 12345}, "password"),
])
def test_update_user_model_raises_error(model_input, expected_error):
    with pytest.raises(ValidationError) as excinfo:
        UserRequest(**model_input)

    assert expected_error in str(excinfo)

@pytest.mark.parametrize("model_input", [
    ({"email": "valid_email@outlook.co.uk", "password": "10charpass", "new_password": "10charpass"}),
    ({"email": "valid_email@gmail.com", "password": "10charpass", "new_password": "40charpass40charpass40charpass40charpass"}),
])
def test_update_user_model(model_input):
    user = UpdateUserRequest(**model_input)

    assert user.new_password == model_input.get("new_password")