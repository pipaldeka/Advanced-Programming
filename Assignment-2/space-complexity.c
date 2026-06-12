#include <stdio.h>
#include <stdlib.h>

// O(1) - Constant space
void constant_space(int n) {
    int a = 0, b = 0, c = 0;
    
    for (int i = 0; i < n; i++) {
        a = i;
        b = i * 2;
        c = a + b;
    }
}

// O(n) - Linear space
void linear_space(int n) {
    int* arr = (int*)malloc(n * sizeof(int));
    
    for (int i = 0; i < n; i++) {
        arr[i] = i;
    }
    
    free(arr);
}

// O(n^2) - Quadratic space
void quadratic_space(int n) {
    int** matrix = (int**)malloc(n * sizeof(int*));
    
    for (int i = 0; i < n; i++) {
        matrix[i] = (int*)malloc(n * sizeof(int));
        
        for (int j = 0; j < n; j++) {
            matrix[i][j] = i * j;
        }
    }
    
    // Free memory
    for (int i = 0; i < n; i++) {
        free(matrix[i]);
    }
    free(matrix);
}

int main() {
    int n;
    
    printf("=== SPACE COMPLEXITY DEMONSTRATION ===\n\n");
    
    // O(1) - Constant
    printf("O(1) - Constant Space:\n");
    printf("Uses 3 integer variables regardless of n\n");
    for (n = 1000; n <= 10000000; n *= 10) {
        constant_space(n);
        printf("n = %10d | Memory used: %zu bytes (3 integers)\n", 
               n, 3 * sizeof(int));
    }
    
    // O(n) - Linear
    printf("\nO(n) - Linear Space:\n");
    printf("Allocates an array of size n\n");
    for (n = 1000; n <= 10000000; n += 1000000) {
        linear_space(n);
        printf("n = %10d | Memory used: %zu bytes\n", 
               n, n * sizeof(int));
    }
        
    // O(n^2) - Quadratic
    printf("\nO(n^2) - Quadratic Space:\n");
    printf("Allocates a 2D matrix of size n x n\n");
    for (n = 100; n <= 1000; n += 100) {
        quadratic_space(n);
        printf("n = %10d | Memory used: %zu bytes\n", 
               n, (size_t)n * n * sizeof(int));
    }
    
    return 0;
}

