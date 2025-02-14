from datetime import datetime, timedelta

import jwt


class TokenService:
    def __init__(self, token_secret, algorithm):
        self.token_secret = token_secret
        self.algorithm = algorithm

    def generate_token(self, email):
        return jwt.encode(
            {
                "email": email,
                "date_issued": str(datetime.now()),
                "expiry": str(datetime.now() + timedelta(days=1))
            },
            self.token_secret,
            algorithm=self.algorithm
        )

    def decrypt_token(self, token):
        return jwt.decode(token, self.token_secret, algorithms=[self.algorithm])
