#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>

#define BUFFER_SIZE 5
#define ITEMS 10

int buffer[BUFFER_SIZE];
int in = 0;
int out = 0;

sem_t empty;
sem_t full;
pthread_mutex_t mutex;

// PRODUCER THREAD
void* producer(void* arg)
{
    for(int i = 1; i <= ITEMS; i++)
    {
        // Wait for empty slot
        sem_wait(&empty);

        // Lock buffer access
        pthread_mutex_lock(&mutex);

        // Add item to buffer
        buffer[in] = i;
        printf("Producer produced item %d at position %d\n", i, in);

        in = (in + 1) % BUFFER_SIZE;

        // Unlock buffer
        pthread_mutex_unlock(&mutex);

        // Signal that buffer has full slot
        sem_post(&full);

        sleep(1);
    }

    return NULL;
}

// CONSUMER THREAD
void* consumer(void* arg)
{
    for(int i = 1; i <= ITEMS; i++)
    {
        // Wait for available item
        sem_wait(&full);

        // Lock buffer access
        pthread_mutex_lock(&mutex);

        // Remove item from buffer
        int item = buffer[out];
        printf("Consumer consumed item %d from position %d\n", item, out);

        out = (out + 1) % BUFFER_SIZE;

        // Unlock buffer
        pthread_mutex_unlock(&mutex);

        // Signal empty slot available
        sem_post(&empty);

        sleep(2);
    }

    return NULL;
}

int main()
{
    pthread_t producerThread;
    pthread_t consumerThread;

    // Initialize semaphores
    sem_init(&empty, 0, BUFFER_SIZE);
    sem_init(&full, 0, 0);

    // Initialize mutex
    pthread_mutex_init(&mutex, NULL);

    // Create threads
    pthread_create(&producerThread, NULL, producer, NULL);
    pthread_create(&consumerThread, NULL, consumer, NULL);

    // Wait for threads to finish
    pthread_join(producerThread, NULL);
    pthread_join(consumerThread, NULL);

    // Cleanup
    sem_destroy(&empty);
    sem_destroy(&full);
    pthread_mutex_destroy(&mutex);

    return 0;
}
