export let sol1 = `#include<bits/stdc++.h>

using namespace std;
int main(){
  
    int a,b;cin>>a>>b;

    vector<int> primes;
    unordered_map<int,bool> m; // to store if the number is composite or not
    
    for(int i = 2;i<=b;i++){
        if(m[i] ==false){
            //it is not a composite/ is a prime 

            if(i>=a){
                primes.push_back(i);
            }
            for(int j = i*i;j<=b;j+=i){
                m[j] = true;
            }
        }
    }
    for(int i  = 0  ;i<primes.size();i++){
        cout<<primes[i]<<" ";
    }
}`