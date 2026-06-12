# Assignment 15

## Question

Write a multithreaded C program using POSIX threads (pthread) where multiple threads increment a shared global counter variable many times.

First implement without any synchronization and observe the incorrect output caused by a race condition. Then modify using a mutex (pthread_mutex_t) to protect the critical section and produce the correct final counter value.

Your program must demonstrate:
- Thread creation using pthread_create()
- Synchronization using pthread_mutex_lock() and pthread_mutex_unlock()
- Thread completion using pthread_join()

Also explain briefly why the race condition occurs and how the mutex solves the problem.
