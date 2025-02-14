import os
from urllib.parse import urljoin

import jwt
import requests
from behave import *

BASE_URL = "http://localhost:8000"


@step('I make a POST request to "{url_path}"')
def post_request(context, url_path):
    context.response = requests.post(urljoin(BASE_URL, url_path), json=context.request_data)


@step("I create the following request")
def create_request(context):
    for row in context.table:
        context.request_data = {}
        for index, value in enumerate(row):
            context.request_data[context.table.headings[index]] = value


@step("The response status should be {status_code}")
def check_status(context, status_code):
    assert context.response.status_code == int(status_code)


@step("The response body should contain {text}")
def check_response(context, text):
    assert text in context.response.text


@step("The response should contain the following json keys")
def check_json_keys(context):
    response = context.response.json()
    for key in context.table.headings:
        assert key in response


@step("The response should contain the following json")
def check_json(context):
    response = context.response.json()
    for row in context.table:
        for index, value in enumerate(row):
            assert response[context.table.headings[index]] == value


@step("The decoded token should have {email} as the email")
def check_token_email(context, email):
    TOKEN_SECRET = os.environ.get("ZENHOME_TOKEN_SECRET", "test-secret")
    TOKEN_ALGORITHM = os.environ.get("ZENHOME_TOKEN_ALGORITHM", "HS256")

    token = context.response.json()["token"]
    decoded_token = jwt.decode(token, TOKEN_SECRET, algorithms=[TOKEN_ALGORITHM])

    assert decoded_token["email"] == email
