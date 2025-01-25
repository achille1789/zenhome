import json
import mysql.connector
import os

# 3 classes so they can be moved in their related microservices
# meaningful names for classes/methods/vars
# private methods for validation to avoid logic repeated
# hashed password with expiry
# 2 authorisation levels
# error handling

# class for Authentication Service
class AuthenticationService:
    # same payload as pseudocode1.py but action "forget" is replaced by "reset" and "deviceId" is added to allow for different authorisation levels
    
    '''
    payload param is expected to be json {
        "action": "create/login/reset/update/delete", - mandatory
        "email": "xxx@yy.z", - mandatory 
        "password": "1234", - mandatory for create, login, update, delete
        "newPassword": "5678", - mandatory for update
        "deviceId": "1a2s3d" - mandatory for "create", 2 types IDs: a unique id to identify ZenHome owner (only 1 account with this id) and
                        a generic id to identify a person authorised to perform a limited set of actions.
                        The idea is the token generated? or in another way, the type of user is set and based on that different actions are allowed.
    }
    '''
    def __init__(self, payload):
        data = json.loads(payload)
        self.action = data['action']
        self.email = data['email']
        self.password = data['password']
        self.new_password = data['newPassword']
        self.device_id = data['deviceId']
        
    # private method to validate email
    def _validate_email(self, email):
        # code to validate email using regex
        # return boolean
        pass

    # private method to validate password
    def _validate_password(self, pwd):
        # code to validate pwd using regex
        # return boolean
        pass

    # private method to validate deviceId
    def _validate_device_id(self, device):
        # code to validate pwd using regex
        # return boolean
        pass
     
    def perform_action(self):
        if self.action == 'create':
            if not self._validate_email(self.email): return "Invalid email"
            if not self._validate_password(self.password): return "Invalid password"
            if not self._validate_device_id(self.device_id): return "Invalid device ID"
            return UserManager().create_user(self.email, self.password, self.device_id)

        if self.action == 'login':
            if not self._validate_email(self.email): return "Invalid email"
            if not self._validate_password(self.password): return "Invalid password"
            return UserManager().login(self.email, self.password)

        if self.action == 'reset':
            if not self._validate_email(self.email): return "Invalid email"
            return UserManager().reset_password(self.email)

        if self.action == 'update':
            if not self._validate_email(self.email): return "Invalid email"
            if not self._validate_password(self.password): return "Invalid password"
            if not self._validate_password(self.new_password): return "Invalid new password"
            return UserManager().update_password(self.email, self.password, self.new_password)

        if self.action == 'delete':
            if not self._validate_email(self.email): return "Invalid email"
            if not self._validate_password(self.password): return "Invalid password"
            return UserManager().delete_user(self.email, self.password)
        
        # handle invalid action
        return "Invalid action"


# class for User Manager Service
class UserManager:
    def __init__(self):
        # example of python mysql connection: https://www.w3schools.com/python/python_mysql_select.asp
        mydb = mysql.connector.connect(
            host="db_host_url",
            user=os.environ['DB_USER'],
            password=os.environ['DB_PWD'],
            database="users"
        )
        self.mycursor = mydb.cursor()
        # TODO: handle DB connection error

    def create_user(self, email, password, device_id):
        # do a request to DB to check if a user with same email already exists
        # do a request to DB to check if an account with the Unique DeviceId already exists
        # if the above checks are successful
        #   then create a new account, set a hashed pwd and set a 3 months expiry
        #   return TokenGenerator(auth_level).get_token()
        # return error message
        pass

    def login(self, email, password):
        # if: do a request to DB to check if credentials are correct and password is not expired:
        #   return TokenGenerator(auth_level).get_token()
        # return error message
        pass

    def reset_password(self, email):
        # generate temporary password
        # if: do a request to DB to update the hashed password and set a 10 minutes expiry:
        #   return TokenGenerator(auth_level).get_token()
        # return error message
        pass

    def update_password(self, email, password, new_password):
        # do a request to DB to check if credentials are correct and password is not expired
        # if: do a request to DB to update the hashed password and set a 3 months expiry:
        #   return TokenGenerator(auth_level).get_token()
        # return error message
        pass

    def delete_user(self, email, password):
        # do a request to DB to check if credentials are correct and password is not expired
        # if: do a request to DB to delete user:
        #   return success message
        # return error message
        pass
    
# class for Token Generator
class TokenGenerator:
    def __init__(self, auth_level):
        # self.token = code to generate a token based on auth_level
        pass
    
    def get_token(self):
        # return self.token
        pass