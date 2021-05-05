export let sol2 = `#include<bits/stdc++.h>

using namespace std;

int main(){
   
    int t;cin>>t;
    unordered_map<int,int> m;
    vector<int> tc;

    while(t--){
        int n;cin>>n;
        tc.push_back(n);
       
    }
    // 10000 is a arbitrary
    for(int i = 2;i<=10000;i++){
        if(m[i]==0){
            for(int j = i*2;j<=10000;j+=i){
                m[j]++; //count how many distict primes are there for a number j
            }
        }
    }
    vector<int> ans;
    for(int i = 2;i<=10000;i++){
        if(m[i]>=3)
            ans.push_back(i);// push to array if the no of distinct primes are atleast 3
    }

    for(int i= 0;i<tc.size();i++){
        cout<<ans[tc[i]-1]<<endl; // print the nth number (0 indexing)
    }

}
`