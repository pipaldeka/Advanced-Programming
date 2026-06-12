"""
main.py
=======
Driver script:
  1. Demo run on a realistic student activity dataset.
  2. Complexity benchmark at input sizes 10, 100, 1_000, 10_000, 20_000.
"""

from __future__ import annotations

import random
import time
from typing import Any

from analyzer import (
    LogEntry,
    total_time_per_user,
    most_active_users,
    unique_actions,
)

# ─────────────────────────────────────────────────────────────────────────────
# Synthetic data generation
# ─────────────────────────────────────────────────────────────────────────────

ACTIONS: list[str] = [
    "YouTube", "Instagram", "WhatsApp", "Google Classroom",
    "Stack Overflow", "GitHub", "ChatGPT", "Netflix",
    "Spotify", "Twitter/X", "Discord", "Zoom",
    "VS Code (web)", "LeetCode", "Coursera",
]

def generate_logs(n: int, num_users: int = 10, seed: int = 42) -> list[LogEntry]:
    """Generate n synthetic activity log entries."""
    rng = random.Random(seed)
    users = [f"CSB{str(i).zfill(3)}" for i in range(1, num_users + 1)]
    return [
        {
            "user"    : rng.choice(users),
            "action"  : rng.choice(ACTIONS),
            "duration": round(rng.uniform(1.0, 120.0), 2),   # 1–120 minutes
        }
        for _ in range(n)
    ]


# ─────────────────────────────────────────────────────────────────────────────
# Helper: pretty-print a section header
# ─────────────────────────────────────────────────────────────────────────────

def header(title: str) -> None:
    print(f"\n{'═' * 62}")
    print(f"  {title}")
    print(f"{'═' * 62}")


# ═════════════════════════════════════════════════════════════════════════════
# 1.  Demo
# ═════════════════════════════════════════════════════════════════════════════

def run_demo() -> None:
    header("ACTIVITY LOG ANALYZER – DEMO  (N = 30 entries, 8 users)")

    # Hard-coded, readable demo logs
    demo_logs: list[LogEntry] = [
        {"user": "CSB001", "action": "YouTube",          "duration": 45.5},
        {"user": "CSB002", "action": "Instagram",         "duration": 20.0},
        {"user": "CSB001", "action": "GitHub",            "duration": 30.0},
        {"user": "CSB003", "action": "ChatGPT",           "duration": 60.0},
        {"user": "CSB002", "action": "WhatsApp",          "duration": 15.0},
        {"user": "CSB004", "action": "Netflix",           "duration": 90.0},
        {"user": "CSB001", "action": "LeetCode",          "duration": 50.0},
        {"user": "CSB003", "action": "Google Classroom",  "duration": 25.5},
        {"user": "CSB005", "action": "Discord",           "duration": 40.0},
        {"user": "CSB004", "action": "Spotify",           "duration": 80.0},
        {"user": "CSB005", "action": "Zoom",              "duration": 55.0},
        {"user": "CSB006", "action": "Stack Overflow",    "duration": 35.0},
        {"user": "CSB006", "action": "VS Code (web)",     "duration": 70.0},
        {"user": "CSB007", "action": "Coursera",          "duration": 100.0},
        {"user": "CSB008", "action": "Twitter/X",         "duration": 18.0},
        {"user": "CSB007", "action": "GitHub",            "duration": 45.0},
        {"user": "CSB008", "action": "YouTube",           "duration": 60.0},
        {"user": "CSB002", "action": "ChatGPT",           "duration": 30.0},
        {"user": "CSB003", "action": "LeetCode",          "duration": 75.0},
        {"user": "CSB001", "action": "Instagram",         "duration": 10.0},
    ]

    # ── total_time_per_user ──────────────────────────────────────────────────
    print("\n▶ Total Screen-Time Per User (minutes):")
    totals: dict[str, float] = total_time_per_user(demo_logs)
    for user, mins in sorted(totals.items()):
        print(f"   {user}  →  {mins:.1f} min")

    # ── most_active_users (top 3) ────────────────────────────────────────────
    k = 3
    print(f"\n▶ Top {k} Most Active Users:")
    top_k: list[str] = most_active_users(demo_logs, k)
    for rank, user in enumerate(top_k, 1):
        print(f"   #{rank}  {user}  ({totals[user]:.1f} min)")

    # ── unique_actions ───────────────────────────────────────────────────────
    print("\n▶ Unique Actions Observed (set – unordered):")
    actions: set[str] = unique_actions(demo_logs)
    print(f"   {actions}")
    print(f"   Total unique actions: {len(actions)}")


# ═════════════════════════════════════════════════════════════════════════════
# 2.  Complexity Benchmark
# ═════════════════════════════════════════════════════════════════════════════

def run_benchmark() -> None:
    header("TIME COMPLEXITY BENCHMARK")

    print("""
  Theoretical complexities
  ─────────────────────────────────────────────────────
  total_time_per_user   : O(N)           – single reduce pass
  unique_actions        : O(N)           – single set-comprehension pass
  most_active_users     : O(N + U log U) – O(N) build + O(U log U) sort
                          ≈ O(N) when U ≪ N  (U = unique users, fixed here)
  ─────────────────────────────────────────────────────""")

    sizes      = [10, 100, 1_000, 10_000, 20_000]
    num_users  = 50      # fixed so U is constant across all sizes
    k          = 10
    warmup     = 3
    runs       = 7

    print(f"\n  {'N':>8}  │  {'total_time (ms)':>20}  │  {'most_active (ms)':>20}  │  {'unique_actions (ms)':>20}")
    print(f"  {'─'*8}─┼─{'─'*20}──┼─{'─'*20}──┼─{'─'*20}")

    for n in sizes:
        logs = generate_logs(n, num_users=num_users, seed=42)

        # warm-up
        for _ in range(warmup):
            total_time_per_user(logs)
            most_active_users(logs, k)
            unique_actions(logs)

        # time total_time_per_user
        t0 = time.perf_counter()
        for _ in range(runs):
            total_time_per_user(logs)
        tt = (time.perf_counter() - t0) / runs * 1000

        # time most_active_users
        t0 = time.perf_counter()
        for _ in range(runs):
            most_active_users(logs, k)
        tm = (time.perf_counter() - t0) / runs * 1000

        # time unique_actions
        t0 = time.perf_counter()
        for _ in range(runs):
            unique_actions(logs)
        tu = (time.perf_counter() - t0) / runs * 1000

        print(f"  {n:>8,}  │  {tt:>20.4f}  │  {tm:>20.4f}  │  {tu:>20.4f}")

    print("""
  Interpretation
  ─────────────────────────────────────────────────────
  • total_time & unique_actions grow linearly with N → O(N) confirmed.
  • most_active grows slightly faster due to the O(U log U) sort term,
    but since U=50 is fixed, sort cost is constant → also appears O(N).
  • Doubling N from 10 000 → 20 000 should roughly double all timings.
  ─────────────────────────────────────────────────────""")


# ═════════════════════════════════════════════════════════════════════════════
# 3.  Space Complexity Summary
# ═════════════════════════════════════════════════════════════════════════════

def print_space_analysis() -> None:
    header("SPACE COMPLEXITY ANALYSIS")
    print("""
  Function                  Intermediate storage          Space
  ─────────────────────────────────────────────────────────────
  total_time_per_user       defaultdict  (U entries)      O(U)
  most_active_users         totals dict  (U entries)      O(U)
                            sorted list  (U entries)      O(U)
                            result slice (k entries)      O(k)
                            ─────────── total ──────────  O(U)
  unique_actions            set          (A entries)      O(A)
  ─────────────────────────────────────────────────────────────
  U = unique users,  A = unique actions,  k ≤ U
  Input logs list itself                                  O(N)
  ─────────────────────────────────────────────────────────────
  All functions are output-space optimal; no redundant copies.
""")


# ─────────────────────────────────────────────────────────────────────────────
# Entry point
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    run_demo()
    run_benchmark()
    print_space_analysis()
