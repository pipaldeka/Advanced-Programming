"""
activity_log_analyzer.py
========================
Analyzes student online-activity logs.

Each log record is a dict:
    {
        "user"    : str,    # roll number, e.g. "CSB001"
        "action"  : str,    # app / website visited
        "duration": float   # screen time in minutes
    }
"""

from __future__ import annotations

from collections import defaultdict
from functools import reduce
from typing import Any


# ─────────────────────────────────────────────────────────────────────────────
# Type alias for a single log entry
# ─────────────────────────────────────────────────────────────────────────────
LogEntry = dict[str, Any]   # {"user": str, "action": str, "duration": float}


# ═════════════════════════════════════════════════════════════════════════════
# 1.  total_time_per_user
# ═════════════════════════════════════════════════════════════════════════════

def total_time_per_user(logs: list[LogEntry]) -> dict[str, float]:
    """
    Return total screen-time (minutes) accumulated by each user.

    Approach
    --------
    • Uses defaultdict(float) so every unseen key starts at 0.0.
    • reduce() folds the entire log into a single accumulator dict –
      avoiding an explicit for-loop over the list.
    • The inner lambda is a one-liner: update the accumulator in-place
      and return it (reduce requires the accumulator to be returned).

    Time Complexity  : O(N)  – one pass via reduce
    Space Complexity : O(U)  – U = number of unique users
    """
    def _accumulate(acc: defaultdict[str, float], entry: LogEntry) -> defaultdict[str, float]:
        acc[entry["user"]] += entry["duration"]
        return acc

    result: defaultdict[str, float] = reduce(
        _accumulate,
        logs,
        defaultdict(float)          # initial value
    )
    # Return as a plain dict for a clean public interface
    return dict(result)


# ═════════════════════════════════════════════════════════════════════════════
# 2.  most_active_users
# ═════════════════════════════════════════════════════════════════════════════

def most_active_users(logs: list[LogEntry], k: int) -> list[str]:
    """
    Return the k users with the highest total screen-time, in descending order.

    Approach
    --------
    • Reuses total_time_per_user (O(N)) to get per-user totals.
    • sorted() with key=lambda sorts the dict items by duration desc – O(U log U).
    • List comprehension extracts just the user names – O(k).

    Time Complexity  : O(N + U log U)   N = log entries, U = unique users
                       When U ≪ N this is effectively O(N).
    Space Complexity : O(U)  for the totals dict + sorted list
    """
    totals: dict[str, float] = total_time_per_user(logs)

    sorted_users: list[str] = [
        user
        for user, _ in sorted(totals.items(), key=lambda item: item[1], reverse=True)
    ]
    return sorted_users[:k]


# ═════════════════════════════════════════════════════════════════════════════
# 3.  unique_actions
# ═════════════════════════════════════════════════════════════════════════════

def unique_actions(logs: list[LogEntry]) -> set[str]:
    """
    Return the set of all distinct actions (apps / websites) found in the logs.

    Approach
    --------
    • Set comprehension – O(N) time, O(A) space where A = unique actions.
    • No explicit loop; duplicate elimination is handled by the set literal.

    Time Complexity  : O(N)
    Space Complexity : O(A)  – A = number of unique actions
    """
    return {entry["action"] for entry in logs}
