import sqlite3

from fastapi import HTTPException, status

class UserManagerService:
    def __init__(self):
        self.sqliteConnection = sqlite3.connect(":memory:")

    def init_db(self):
        cursor = self.sqliteConnection.cursor()

        sql_query = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, email TEXT, password BINARY);"

        cursor.execute(sql_query)

    def create_user(self, email: str, password: bytes) -> None:
        cursor = self.sqliteConnection.cursor()
        try:
            cursor.execute(f"insert into users (email, password) values ('{email}','{password.decode()}');")
            self.sqliteConnection.commit()
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    def get_user(self, email: str) -> list:
        cursor = self.sqliteConnection.cursor()
        try:
            cursor.execute(f"select * from users where email='{email}';")
            result = cursor.fetchall()
            self.sqliteConnection.commit()
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
        if len(result) > 1:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail=f"More than one user with email: {email}")
        return result


if __name__ == "__main__":
    service = UserManagerService()
    service.create_user("some_email@email.com", b"test-password")

    print(service.get_user("some_email@email.com"))
