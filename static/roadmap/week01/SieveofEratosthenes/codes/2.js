export let code2 = `
// Sieve Of Eratosthenes
// time comp = O(N)
#include <stdio.h>
#include <math.h>

typedef enum { false, true } bool;

int main ()
{
	int n, i, j;
	bool was[1000];

	scanf ("%d", &n);

	was[0] = was[1] = true;
	for (i=2; i*i<=n; i++)
		if (was[i] == false)
			for (j=i*i; j<=n; j+=i)
				was[j] = true;
	
	for (i=1; i<=n; i++)
		if (was[i] == false)
			printf ("%d ", i);
	printf ("\n");
}`