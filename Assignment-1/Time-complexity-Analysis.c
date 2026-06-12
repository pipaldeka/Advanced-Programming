#include <stdio.h>
#include <time.h>

int linear(int n){
        int i, a;

        for (i=0; i<n; i++){
                a = 0;
        }
}

int constant(int n){
	int a;
	a = n*2;
}

int quadratic(int n){
        int i, j, a;
        for (i=1; i<n; i++){
                for (j=0; j<i; j++){
               		a = 0;
                }
        }


}
int main(){
        int a,b,c;
	clock_t time_req;
	printf("\n\n---==Constant Time Algorithm==---\n\n");
	for (c=1000; c <= 5000; c=c+1000){
		time_req = clock();
                constant(c);
                time_req = clock() - time_req;
                printf("Input=%d | Time taken = %f seconds\n", c, (double)time_req / CLOCKS_PER_SEC);
        }
	
	printf("\n\n");

	printf("\n\n---==Linear Time Algorithm==---\n\n");
        for(a = 100000000; a <= 500000000; a = a+100000000){
		linear(a);
                time_req = clock() - time_req;
            	printf("Input=%d | Time taken = %f seconds\n", a, (double)time_req / CLOCKS_PER_SEC);
        }

	
	printf("\n\n");

        printf("\n\n---==Quadratic Time Algorithm==---\n\n");
	for(b =4000; b<=20000; b = b+4000){
                time_req = clock();
                quadratic(b);
                time_req = clock() - time_req;
		printf("Input=%d | Time taken = %f seconds\n", b, (double)time_req / CLOCKS_PER_SEC);
	
	}

	printf("\n\n");


        return 0;

}
