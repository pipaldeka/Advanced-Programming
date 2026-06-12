class InvalidEmailError(Exception):
    pass


class UnderageError(Exception):
    pass


class RegistrationService:

    def register_user(self, email, age):

        if not email or "@" not in email:
            raise InvalidEmailError("Invalid email address")

        if age < 18:
            raise UnderageError("User must be at least 18 years old")

        return True