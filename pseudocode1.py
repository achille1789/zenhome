import json

# generic names for classes/methods/vars
# one class for all code
# same code (ie: values validation) repeated in multiple places
# nested if statements
# no password hashing - kept in clear
# no password expiry
# no different authorisation levels
# no error handling

class Main:
    '''
    payload param is expected to be json {
        "action": "create/login/forget/update/delete", - mandatory
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
     
        
    # one method for all actions
    def login(self):
        if self.act == 'create':
            # code below will be multiple If statements
            # first if: some code that perform email, password validation
            # second if: do a request to DB to check if a user with same email already exists
            # if the above checks are successful
            #   do a request to DB to create a new account and set a pwd in clear
            #   code to generate a token probably with an external pkg
            #   return a token and a success message
            # else
            #   return an error message
            pass

        if self.act == 'login':
            # code below will be multiple If statements
            # first if: some code that perform email, password
            # second if: do a request to DB to check if email and pwd are correct
            # if the above checks are successful
            #   code to generate a token probably with an external pkg
            #   return a token and a success message
            # else
            #   return an error message
            pass

        if self.act == 'forget':
            # code below will be multiple If statements
            # first if: some code that perform email validation
            # second if: do a request to DB to check if email has an account and retrieve password
            # if the above checks are successful
            #   code to send an email with password from db probably with an external pkg
            #   return a success message
            # else
            #   return an error message
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