export let medemo1  =`// Modular Exponentiation (Power in Modular Aritmetic) (x^y)
#include <iostream>
#define M 100000007

int main ()
{
	long long int x,y,res=1;
	cin >> x >> y;
	x = x%M;
	while (y > 0) {
		if (y%2) 
			res = (res*x)%M;
		y = y/2;
		x= (x*x)%M; 
	}
	cout << res << endl;

	return 0;
}`