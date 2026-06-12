# Assignment 13

## Question

In C, implement a Dynamic String Buffer that automatically grows as needed.

Requirements:
1. Create a StringBuffer struct containing a char *data, a size_t length, and a size_t capacity.
2. Write sb_init(size_t initial_capacity) that allocates the struct and data buffer on the heap. Handle NULL returns from malloc.
3. Write sb_append(StringBuffer *sb, const char *str).
4. If the new string exceeds current capacity, use realloc to double the capacity. Handle realloc safely (don't overwrite the original pointer if it returns NULL).
5. Write sb_free(StringBuffer *sb) which frees both the internal data and the struct itself.

Demonstrate the buffer growing at least twice and then free all memory.
