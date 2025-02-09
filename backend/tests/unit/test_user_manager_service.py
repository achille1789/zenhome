import sqlite3
from unittest.mock import patch, MagicMock

import pytest
from fastapi import HTTPException

from backend.backend.user_manager_service import UserManagerService


@pytest.fixture()
def user_manager():
    user_manager_service = UserManagerService()
    user_manager_service.init_db()
    return user_manager_service


def test_create_user(user_manager):
    cursor = user_manager.sqliteConnection.cursor()
    cursor.execute("select count(*) from users;")
    assert cursor.fetchall() == [(0,)]

    user_manager.create_user("test_email", b"test_password")

    cursor.execute("select count(*) from users;")
    assert cursor.fetchall() == [(1,)]


def test_create_user_returns_http_exception():
    with pytest.raises(HTTPException), patch("backend.backend.user_manager_service.sqlite3") as mock_sqlite:
        mock_sqlite.connect().cursor().execute.side_effect = sqlite3.Error("Test error")
        user_manager = UserManagerService()

        user_manager.create_user("test_email", b"test_password")


def test_get_user(user_manager):
    user_manager.create_user("test_email", b"test_password")

    user = user_manager.get_user("test_email")

    assert user == [(1, "test_email", "test_password")]


def test_get_user_returns_http_exception_if_db_error():
    with pytest.raises(HTTPException), patch("backend.backend.user_manager_service.sqlite3") as mock_sqlite:
        mock_sqlite.connect().cursor().execute.side_effect = sqlite3.Error("Test error")
        user_manager = UserManagerService()

        user_manager.get_user("test_email")

def test_get_user_returns_http_exception_if_more_than_one_user():
    with pytest.raises(HTTPException), patch("backend.backend.user_manager_service.sqlite3") as mock_sqlite:
        mock_sqlite.connect().cursor().fetchall.return_value = [(1, "test_email", "test_password"), (2, "test_email", "test_password")]
        user_manager = UserManagerService()

        user_manager.get_user("test_email")
