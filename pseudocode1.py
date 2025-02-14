import datetime
import json
import re
import smtplib
from email.message import EmailMessage
import sqlite3
import jwt

# generic names for classes/methods/vars
# one class for all code
# same code (ie: values validation) repeated in multiple places
# nested if statements
# no password hashing - kept in clear
# no password expiry
# no different authorisation levels
# no error handling

TOKEN_SECRET = "test-secret"

class Main:
    '''
    payload param is expected to be json {
        "action": "create/login/forgot/update/delete", - mandatory
        "email": "xx@yy.z", - mandatory 
        "password": "1234", - mandatory for create, login, update, delete
        "newPassword": "5678", - mandatory for update
    }
    '''
    def __init__(self, payload):
        data = json.loads(payload)
        self.act = data['action']
        self.email = data['email']
        self.pwd = data['password']
        self.new_pwd = data['newPassword']
        self.sqliteConnection = sqlite3.connect('zenhome_users.db')
        self.init_db()

    def init_db(self):
        cursor = self.sqliteConnection.cursor()

        sql_query = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, email TEXT, password TEXT);"

        cursor.execute(sql_query)

    # one method for all actions
    def login(self):
        if self.act == 'create':
            # code below will be multiple If statements
            # first if: some code that perform email, password validation
            if self.validate_email() and self.validate_password():
                # validation passed
                pass
                # second if: do a request to DB to check if a user with same email already exists
                user = self.get_user()[0]
                if user:
                    # user exists - error
                    pass
                else:
                    # user doesn't exist
                    #   do a request to DB to create a new account and set a pwd in clear
                    #   code to generate a token probably with an external pkg
                    #   return a token and a success message
                    if self.create_user():
                        # user created successfully
                        return self.generate_token()
                    else:
                        # some issue writing to DB
                        #   return an error message
                        pass
            else:
                # Raise some error
                pass


        if self.act == 'login':
            # code below will be multiple If statements
            # first if: some code that perform email, password validation
            if self.validate_email() and self.validate_password():
                # validation passed
                # second if: do a request to DB to check if email and pwd are correct
                user = self.get_user()[0]
                if user:
                    if self.compare_email(user['email']) and self.compare_password(user['password']):
                        # second if: do a request to DB to check if email and pwd are correct
                        return self.generate_token()
                    else:
                        # password doesn't match, return error
                        pass
                else:
                    # No such user, return error
                    pass
            else:
                # return an error message
                pass
            pass

        if self.act == 'forgot':
            # code below will be multiple If statements
            # first if: some code that perform email validation
            if self.validate_email():
                # second if: do a request to DB to check if email has an account and retrieve password
                user = self.get_user()[0]
                if user:
                    if self.compare_email(user['email']):
                        #   code to send an email with password from db probably with an external pkg
                        #   return a success message
                        self.email_password(user['email'], user['password'])
                        return True
                    else:
                        # No user with that email, return Error
                        pass
                else:
                    # No user with that email, return Error
                    pass
            else:
                # Invalid email, return error
                pass

        if self.act == 'update':
            # code below will be multiple If statements
            # first if: some code that perform email, password, newPassword validation
            # second if: do a request to DB to check if email and pwd are correct
            # if the above checks are successful
            #   do a request to DB to update the password
            #   return a token and a success message
            # else
            #   return an error message
            pass

        if self.act == 'delete':
            # if statement: some code that perform email, password validation
            # if the above check is successful
            #   do a request to DB to delete account
            #   return a success message
            # else
            #   return an error message
            pass

    def compare_email(self, email):
        if self.email == email:
            return True
        else:
            return False

    def compare_password(self, pwd):
        if self.pwd == pwd:
            return True
        else:
            return False

    def validate_email(self):
        # must have @ symbol in
        # must have .com or .co.uk in
        # must be from list of allowed providers
        # alphanumeric and underscore only
        email_pattern = r"[a-zA-Z_]+@(gmail|outlook)\.(com|co\.uk)"
        is_match = re.match(email_pattern, self.email)
        if is_match:
            return True
        else:
            return False

    def validate_password(self):
        # min length 10
        # max length 40
        # contain 1 lower case, 1 uppercase, 1 number
        if len(self.pwd) >= 10 and len(self.pwd) <= 40 and re.match(r"^[a-zA-Z0-9]+$", self.pwd):
            return True
        else:
            return False

    def email_password(self, email, pwd):
        msg = EmailMessage()
        msg['Subject'] = 'Your Zenhome password'
        msg['From'] = "zenhome@yahoo.com"
        msg['To'] = email

        message_content = f"Dear User,\n Here is you requested password reminder.\npassword: {pwd}\nThanks,\nZenhome Team"

        msg.set_content(f"Dear User,\n Here is you requested password reminder.\npassword: {pwd}\nThanks,\nZenhome Team")

        s = smtplib.SMTP('localhost')
        s.send_message(msg)
        s.quit()

        print(message_content)

    def get_user(self):
        cursor = self.sqliteConnection.cursor()

        sql_query = f"select * from users where email='{self.email}';"

        cursor.execute(sql_query)
        result = cursor.fetchall()
        cursor.close()
        return result

    def create_user(self):
        cursor = self.sqliteConnection.cursor()

        sql_query = f"insert into users (email, password) values ('{self.email}', '{self.pwd}');"
        print(sql_query)

        cursor.execute(sql_query)
        result = cursor.fetchall()
        self.sqliteConnection.commit()
        cursor.close()
        return result

    def generate_token(self):
        # token expires after 1 day
        token = jwt.encode({"email": self.email, "date_issued": str(datetime.datetime.now()), "expiry": str(datetime.datetime.now() + datetime.timedelta(days=1))}, TOKEN_SECRET, algorithm="HS256")
        return token

if __name__ == "__main__":
    zenhome_object = Main(
        "{\"action\":\"create\", \"email\":\"some_email@gmail.com\", \"password\":\"Password123\", \"newPassword\":\"Password123\"}"
    )

    zenhome_object.create_user()

    print(zenhome_object.get_user())

    token = zenhome_object.generate_token()

    print(token)

    decoded_token = jwt.decode(token, TOKEN_SECRET, algorithms=["HS256"])
    print(decoded_token)

