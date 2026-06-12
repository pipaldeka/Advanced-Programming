#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct
{
    char *data;
    size_t length;
    size_t capacity;
} StringBuffer;

StringBuffer *sb_init(size_t initial_capacity)
{
    if (initial_capacity == 0)
        initial_capacity = 1;

    StringBuffer *sb = malloc(sizeof(StringBuffer));
    if (sb == NULL)
    {
        fprintf(stderr, "sb_init: failed to allocate StringBuffer struct\n");
        return NULL;
    }

    sb->data = malloc(initial_capacity);
    if (sb->data == NULL)
    {
        fprintf(stderr, "sb_init: failed to allocate data buffer\n");
        free(sb);
        return NULL;
    }

    sb->data[0] = '\0';
    sb->length = 0;
    sb->capacity = initial_capacity;
    return sb;
}

int sb_append(StringBuffer *sb, const char *str)
{
    if (sb == NULL || str == NULL)
        return -1;

    size_t str_len = strlen(str);
    size_t needed = sb->length + str_len + 1;

    while (needed > sb->capacity)
    {
        size_t new_capacity = sb->capacity * 2;
        char *new_data = realloc(sb->data, new_capacity);
        if (new_data == NULL)
        {
            fprintf(stderr, "sb_append: realloc failed (tried %zu bytes)\n", new_capacity);
            return -1;
        }
        sb->data = new_data;
        sb->capacity = new_capacity;
        printf("  [GROW] capacity doubled to %zu bytes\n", sb->capacity);
    }

    memcpy(sb->data + sb->length, str, str_len + 1);
    sb->length += str_len;
    return 0;
}

void sb_free(StringBuffer *sb)
{
    if (sb == NULL)
        return;
    free(sb->data);
    free(sb);
}

void sb_print_state(const StringBuffer *sb, const char *label)
{
    printf("\n[%s]\n", label);
    printf("  data     : \"%s\"\n", sb->data);
    printf("  length   : %zu\n", sb->length);
    printf("  capacity : %zu\n", sb->capacity);
}

int main(void)
{
    puts("=== Dynamic String Buffer Demo ===\n");

    StringBuffer *sb = sb_init(8);
    if (sb == NULL)
        return 1;

    sb_print_state(sb, "After init (capacity=8)");

    sb_append(sb, "Hello");
    sb_print_state(sb, "After append(\"Hello\")");

    sb_append(sb, ", World");
    sb_print_state(sb, "After append(\", World\")");

    sb_append(sb, "! How are you today?");
    sb_print_state(sb, "After append(\"! How are you today?\")");

    sb_append(sb, " Hope all is well.");
    sb_print_state(sb, "After append(\" Hope all is well.\")");

    puts("\n=== Freeing all memory ===");
    sb_free(sb);
    puts("Done. No leaks.");

    return 0;
}