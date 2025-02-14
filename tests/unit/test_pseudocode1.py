import pytest
from unittest.mock import patch, MagicMock
import json
from pseudocode1 import Main


@pytest.fixture
def zenhome_object():
    payload = json.dumps({
        "action": "login",
        "email": "test@gmail.com",
        "password": "Password123",
        "newPassword": ""
    })
    return Main(payload)


@pytest.mark.parametrize("email_input, expected_result", [
    ("test@gmail.com", True),
    ("non_matching_email@somedomain.co.uk", False)
])
def test_compare_email(zenhome_object, email_input, expected_result):
    assert zenhome_object.compare_email(email_input) == expected_result


@pytest.mark.parametrize("password_input, expected_result", [
    ("Password123", True),
    ("321drowssaP", False)
])
def test_compare_password(zenhome_object, password_input, expected_result):
    assert zenhome_object.compare_password(password_input) == expected_result


@pytest.mark.parametrize("password, expected_result", [
    ("short", False),
    ("waytoolongpassword12345678901234567890123", False),
    ("PasswordWithInvalidChars!", False),
    ("passwordOfTheCorrectLength123", True),
])
def test_validate_password(zenhome_object, password, expected_result):
    zenhome_object.pwd = password
    assert zenhome_object.validate_password() == expected_result


@pytest.mark.parametrize("email, expected_result", [
    ("myemail@incorrect_domain.com", False),
    ("1nval!dchars@gmail.com", False),
    ("invalid_suffix@outlook.net", False),
    ("ivalid_chars_but_not_an_email", False),
    ("good_gmail@gmail.com", True),
    ("good_outlook@outlook.co.uk", True),
])
def test_validate_email(zenhome_object, email, expected_result):
    zenhome_object.email = email
    assert zenhome_object.validate_email() == expected_result


"""
Test get user
 - returns user from database
 - returns nothing if no user found
 - test sql error is handled
 
 Create user
 - test user is created
 - test user raises some useful exception if user already exists
 - test sql error is handled
 
 Test token is generated, decoded, time is correct
 
 Test pwd/email comparison
 
 Test regex patterns
 
 Test each path in main method
"""
