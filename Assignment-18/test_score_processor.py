import pytest
import tempfile
from score_processor import ScoreProcessor

processor = ScoreProcessor()

def make_file(content):
    tmp = tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False)
    tmp.write(content)
    tmp.close()
    return tmp.name

def test_valid_score():
    assert processor.process_score_file(make_file("7")) == 70

def test_missing_file():
    with pytest.raises(FileNotFoundError):
        processor.process_score_file("missing.txt")

def test_invalid_content():
    with pytest.raises(ValueError):
        processor.process_score_file(make_file("abc"))
