#include <stdio.h>
#include <pthread.h>

#define NUM_THREADS 4
#define INCREMENTS 100000

int counter = 0;

pthread_mutex_t lock;

void* without_mutex(void* arg)
{
    for(int i = 0; i < INCREMENTS; i++)
    {
        counter++;
    }

    return NULL;
}

void* with_mutex(void* arg)
{
    for(int i = 0; i < INCREMENTS; i++)
    {
        pthread_mutex_lock(&lock);

        counter++;

        pthread_mutex_unlock(&lock);
    }

    return NULL;
}

int main()
{
    pthread_t threads[NUM_THREADS];

    // -----------------------------
    // WITHOUT MUTEX
    // -----------------------------
    counter = 0;

    for(int i = 0; i < NUM_THREADS; i++)
    {
        pthread_create(&threads[i], NULL, without_mutex, NULL);
    }

    for(int i = 0; i < NUM_THREADS; i++)
    {
        pthread_join(threads[i], NULL);
    }

    printf("Without mutex: %d\n", counter);

    // -----------------------------
    // WITH MUTEX
    // -----------------------------
    counter = 0;

    pthread_mutex_init(&lock, NULL);

    for(int i = 0; i < NUM_THREADS; i++)
    {
        pthread_create(&threads[i], NULL, with_mutex, NULL);
    }

    for(int i = 0; i < NUM_THREADS; i++)
    {
        pthread_join(threads[i], NULL);
    }

    pthread_mutex_destroy(&lock);

    printf("With mutex: %d\n", counter);

    return 0;
}
