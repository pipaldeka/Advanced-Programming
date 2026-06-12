# Assignment 18

## Question

Create a simple data utility class that reads an integer value from a text file, performs a calculation, and ensures all system resources are properly closed afterward even if something goes wrong.

Your program needs to read a numeric score from a file, multiply it by 10, and return the result. Handle missing files and invalid data format gracefully.

If choosing Java: Create ScoreProcessor with public int processScoreFile(String filePath) using try-catch-finally. Catch FileNotFoundException and NumberFormatException. Use finally to print 'File cleanup completed'. Write JUnit 5 tests: one for successful calculation, one using assertThrows for a missing file.

If choosing Python: Create ScoreProcessor with def process_score_file(self, file_path: str) -> int using try-except-else-finally. Catch FileNotFoundError and ValueError. Use else to print 'Data processed successfully' and finally to print 'File cleanup completed'. Write pytest suite with pytest.raises for missing file.
