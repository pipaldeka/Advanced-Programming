class ScoreProcessor:
    def process_score_file(self, file_path: str) -> int:
        try:
            file = open(file_path, "r")
            score = int(file.read().strip())
        except FileNotFoundError:
            print(f"Error: File not found - '{file_path}'")
            raise
        except ValueError:
            print(f"Error: File does not contain a valid integer.")
            raise
        else:
            print("Data processed successfully")
            return score * 10
        finally:
            print("File cleanup completed")
