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

            # one method for all actions
            def login(self):
                if self.act == 'create':
                    # code below will be multiple If statements
                    if self.validate_email() and self.validate_password():
                        user = self.get_user()
                        if user:
                            return "User already exists"

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
                                   return "Couldn't create a new user."
                    else:
                        return "Failed to validate login credentials."

                if self.act == 'login':
                    # code below will be multiple If statements
                    # first if: some code that perform email, password validation
                    if self.validate_email() and self.validate_password():
                        # validation passed
                        # second if: do a request to DB to check if email and pwd are correct
                        user = self.get_user()
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
                        user = self.get_user()
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
                    if self.validate.email() and self.validate.password() and self.validate.newPassword():
                        pass
                    # second if: do a request to DB to check if email and pwd are correct
                    user = self.get_user()
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
                    # if the above checks are successful
                    #   do a request to DB to update the password #

                def create_new_password():
                    if self.validate.newPassword():
                        #return a token and a success message
                        pass
                    return self.generate_token()
                    #else:
                        #return an error message
                        #pass






                if self.act == 'delete':
                    # if statement: some code that perform email, password validation
                    if self.validate_email() and self.validate_password():
                        # validation passed
                        # second if: do a request to DB to check if email and pwd are correct
                        user = self.get_user()
                        if user:
                            if self.compare_email(user['email']) and self.compare_password(user['password']):
                                pass
                    #   do a request to DB to delete account
                        # unsure how to delete in Python (cursor.execute?)
                    #   return a success message
                    print("Password deleted successfully.")
                    # else
                    #   return an error message
                    pass