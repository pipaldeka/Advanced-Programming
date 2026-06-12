import pytest
from registration_service import RegistrationService, InvalidEmailError, UnderageError

@pytest.fixture
def service():
    return RegistrationService()

# --- Happy path ---

def test_valid_registration(service):
    assert service.register_user("regex@regex.com", 25) is True

def test_minimum_age_allowed(service):
    assert service.register_user("bob@example.com", 18) is True

# --- Invalid email ---

def test_empty_email_raises(service):
    with pytest.raises(InvalidEmailError):
        service.register_user("", 20)

def test_malformed_email_raises(service):
    with pytest.raises(InvalidEmailError):
        service.register_user("notanemail", 20)

# --- Underage ---

def test_underage_raises(service):
    with pytest.raises(UnderageError):
        service.register_user("young@example.com", 16)

def test_age_17_raises(service):
    with pytest.raises(UnderageError):
        service.register_user("teen@example.com", 17)