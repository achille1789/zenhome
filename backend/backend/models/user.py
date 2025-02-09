from pydantic import BaseModel, ConfigDict, constr

from backend.backend.common import EMAIL_REGEX, PASSWORD_REGEX


class UserRequest(BaseModel):
    email: constr(pattern=EMAIL_REGEX, strict=True, strip_whitespace=True)
    password: constr(pattern=PASSWORD_REGEX, strict=True, strip_whitespace=True)

    model_config = ConfigDict(extra="forbid")


class UpdateUserRequest(UserRequest):
    new_password: constr(pattern=PASSWORD_REGEX, strict=True, strip_whitespace=True)
