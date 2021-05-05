export let code3 = `//Prime Numbers Between Range 2 to N

import java.util.*;
public class Main
{
	public static void main(String[] args) {
		
		Scanner sc=new Scanner(System.in);
		int N=sc.nextInt();
        boolean[]arr=new boolean[N+1];

        //Initializing all elements of array as true
        Arrays.fill(arr,true);
        
        //Initializing 0th and 1st index to false
        arr[0]=arr[1]=false;
        
        //Starting from 2 to Sqrt(arr.length)
        for(int i=2;i<=Math.sqrt(N);i++)
        {
            //if(that particular index is true,means that element is prime)
            if(arr[i]==true)
            
            //making its factors as non-prime
            for(int j=i*i;j<arr.length;j+=i)
            {
                arr[j]=false;
            }
        }
        
        //Now we have array which have true for prime values only, just printing them
        
        int count=0;
        for(int q=2;q<arr.length;q++)
        {
            if(arr[q]==true)
            System.out.println(arr[q]+" ");
	}
    }
}`