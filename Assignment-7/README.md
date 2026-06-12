# Assignment 7

## Question

Develop an activity log analyzer in Python.

You are given a list of activity records:
{
    "user": str,         // roll numbers of students
    "action": str,       // online activities such as apps, websites visited etc.
    "duration": float    // screen time for each activity
}

You must:
1. Store data efficiently using Python built-in containers.
2. Implement the following:
   - def total_time_per_user(logs: list[dict]) -> dict[str, float]
   - def most_active_users(logs: list[dict], k: int) -> list[str]
   - def unique_actions(logs: list[dict]) -> set[str]
3. Use dict, set, and list; comprehensions where appropriate; sorted() with key; avoid explicit loops where possible; typing annotations; defaultdict optionally; reduce() to compute total activity time.
4. Perform complexity analysis:
   a. Time complexity for computing top K users
   b. Space complexity of storing intermediate results
