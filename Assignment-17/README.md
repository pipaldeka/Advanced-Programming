# Assignment 17

## Question

Build a user onboarding validation module for a platform.

The system must ensure the email string is neither null nor empty, conforms to a standard email format (valid identifier, @ symbol, and domain name). Additionally enforce a strict age restriction where applicants must be at least 18 years old.

If choosing Java: Implement a checked exception InvalidEmailException and unchecked UnderageException. Create a RegistrationService class with public boolean registerUser(String email, int age) throws InvalidEmailException. Include an internal assert statement. Write a JUnit 5 test suite RegistrationServiceTest using @BeforeEach, assertThrows for both custom exceptions.

If choosing Python: Implement InvalidEmailError and UnderageError inheriting from appropriate built-in classes. Create a RegistrationService class with def register_user(self, email: str, age: int) -> bool. Use an internal assert statement. Write a pytest suite using @pytest.fixture and pytest.raises.
