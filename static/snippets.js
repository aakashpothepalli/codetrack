export let snippets = [
    {
        tags:"sieve primes",
        code:`
//sieve
vector<int> pr;
const int N = 1000000;
void sieve(){
    int lp[N+1];
    memset(lp,0,sizeof(lp));
    for (int i=2; i<=N; ++i) {
        if (lp[i] == 0) {
            lp[i] = i;
            pr.push_back (i);
        }
        for (int j=0; j<(int)pr.size() && pr[j]<=lp[i] && i*pr[j]<=N; ++j)
            lp[i * pr[j]] = pr[j];
    }
}
        `
    },
    {
        tags:"bfs graph",
        code:`
//bfs
vector<int> g[n]; //input edges in this  
queue<int> q;
unordered_map<int,bool> vis;
q.push(0);
vis[0] = true;
while(!q.empty()){
    int p =q.front();
    q.pop();
    for(int i=0;i<g[p].size();i++){
        int k =g[p][i];
        if(!vis[k]){
            vis[k] = true;
            q.push(k);
        }
    }
}
    `
    },
    {
        'tags':'isprime check prime',
        code:`
// prime check O(sqrt(n))
bool isPrime(long long  n){
    if(n==1)return 1;
    for(long long i  = 2;i<=sqrt(n);i++){
        if(n%i==0){
            return false;
        }
    }
    return true ;
}
        `
    },
    {
        tags:'dp template recursive',
        code:`
//dp template recursive
int tb[100000];
long long mod = 1e9+7;
int n;
int ar[100000];

long long solve(int i){

}
        `
    },
    {
        tags:'mod modulo % operation add multiply divide subtract',
        code:`
//add sub mul div mod 10^9+7
long long mod = 1e9+7;
long long  addMOD(long long a , long long b){
    return (a%mod + b%mod)%mod;
}

long long subMOD(long long a, long long b){
    return (((a%mod - b%mod) % mod + mod) % mod);
}

long long mulMOD(long long a , long long b){
    return ((a%mod)* (b%mod))%mod;
}

  long long gcdExtended(long long a, long long b, long long *x, long long *y) { 
    // Base Case 
    if (a == 0) 
    { 
        *x = 0, *y = 1; 
        return b; 
    } 
    long long x1, y1;
    long long gcd = gcdExtended(b%a, a, &x1, &y1); 
    *x = y1 - (b/a) * x1; 
    *y = x1; 
  
    return gcd; 
} 
   
long long modInverse(long long b, long long m) 
{ 
    long long x, y; 
    long long g = gcdExtended(b, m, &x, &y); 
    if (g != 1) 
        return -1; 
    return (x%m + m) % m; 
} 
  
long long divMOD(long long a, long long b) 
{ 
    a = a % mod; 
    long long inv = modInverse(b, mod); 
    if (inv == -1) {
       cout << "Division not defined"; 
       return -1;
    }
    else{
        return (inv*a)%mod;
    }
}`
    },
    {
        tags:'dijkstra multisource shortest path weighted',
        code:`

// dijkstra multisource shortest path
// n = no of vertices
// m = no of edges
// sources = starting node/nodes
/*  
    graph input
    fori(i ,0,m){
        int u, v, w;
        cin>>u>>v>>w;
        g[u].push_back({w, v});
        g[v].push_back({w, u});
    }
*/

struct comp{
	bool operator()(pair<int,int> a, pair<int,int> b){
		if (a.first != b.first)
			return a.first > b.first;
		return a.second < b.second;
	}	
};
int dijkstra(int n,int m, vector<pair<int,int>> g[],vector<int> sources){

    long long dis[n+1];
    bool vis[n+1];
    int par[n+1];

    priority_queue<pair<int,int>, vector<pair<int,int>>,comp> Q;

    for(int i=1; i<=n; i++){
        dis[i] = INT_MAX, vis[i] = 0;
    
    }
    for(int el :sources){
        dis[el] = 0;
        Q.push({0, el});
    }

    while(!Q.empty()){
        pair<int,int> cur = Q.top(); Q.pop();
        if (vis[cur.second]) continue;
        vis[cur.second] = 1;
        dis[cur.second] = cur.first;
        for(pair<int,int> x: g[cur.second]){
            int to = x.second, w = x.first;
            Q.push({cur.first+w, to});
        }
    }
    //print distance from source
    // fori(i,1,n+1){
    //     cout<<i<<" "<<dis[i]<<endl;
    // }
}
`
    },
    {
        tags:'ncr factorial mod combinations ', 
        code:`
// ncr factorial mod combination 
long long mod = 1e9+7;
long long power(long long x, long long y, long long p)  {  
    long long res = 1; 
    x = x % p;
    if (x == 0) return 0;
    while (y > 0)  {  
        if (y%2 == 1)  
            res = (res*x) % p;  
        y = y/=2; 
        x = (x*x) % p;  
    }  
    return res;  
} 

long long fact[100000];
void factmod(long long n , long long p ){
    fact[0] =1 ;
    for(long long i= 1;i<=n;i++){
        fact[i] = ((fact[i-1]%p)*(i%p))%p;
    }
}

long long ncr(long long n, long long r){
    return ( fact[n]%mod * power(fact[n-r],mod -2,mod)%mod * power(fact[r],mod-2,mod)%mod )%mod;
}`
    },{
        tags:'gcd',
        code:`
long long gcd(long long a, long long b){
    if (b == 0) {
        return a;
    }
    return gcd(b, a%b);

}`
    },
    {
        tags:'t2o o2t',
        code:`
// t2o o2t
int t2o(int x , int rowSize,int y){
    int index = x * rowSize + y;
    return index;
}

pair<int,int> o2t(int index,int rowSize){
    return {index/rowSize,index%rowSize};
}`
    },
    {
        tags:'power mod',
        code:`
long long power(unsigned long long x, unsigned int y, int p)  
{  
    long long r= 1;
    x = x % p; 
    if (x == 0) return 0;
  
    while (y > 0)  {  
        if (y & 1)  
            r = (r*x) % p;  
        y = y>>1;
        x = (x*x) % p;  
    }  
    return r;  
}        
`
    },
    {
        tags:'bit fenwick tree range query',
        code:`
long long bit[100000];
int n;
long long  sum(vector<int> ar,int r){
    long long  tot=0;
    for(int i = r;i>=0;i = (i&(i+1))-1){
        tot+=bit[i];
    }
    return tot;
}
long long  sum(vector<int> ar,int l , int r){
    if(l<1)
        return sum(ar,r);
    else 
        return sum(ar,r) - sum(ar,l-1);
}
void add(int idx, int delta) {
    for (; idx < n; idx = idx | (idx + 1))
        bit[idx] += delta;
}
void init(vector<int> ar){
    fori(i,0,ar.size()){
        add(i,ar[i]);
    } 
}
// int main(){
//     memset(bit,0,sizeof(bit));
//     vector<int> ar = {1,2,3,4,5,6};
//     n = ar.size();
//     init(ar);
//     cout<<sum(ar,0,4)<<endl;

// }    
`
    },
    {
        tags:'prime test miller',
        code:`
//prime test miller        
long long mulMOD(long long a , long long b,long long p){
    return ((a%p)* (b%p))%p;
}

long long power(unsigned long long x, unsigned int y, int p)  
{  
    long long r= 1;
    x = x % p; 
    if (x == 0) return 0;
    
    while (y > 0)  {  
        if (y & 1)  
            r = (r*x) % p;  
        y = y>>1;
        x = (x*x) % p;  
    }  
    return r;  
}        


bool miller(long long n){
    if(n <=1 || n % 2 == 0){
        if(n != 2){
            return false;
        }
    }
    if(n == 2 || n == 3){
        return true;
    }
    long long d = n-1;
    while(d % 2 == 0){
        d /= 2;
    }
    long long a[] = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37};
    for(int i = 0; i < 12 && a[i] < n; ++i){
        long long temp = d;
        long long mod = power(a[i], temp, n);
        if(mod == 1){
            continue;
            }
        while(temp != n-1 && mod != n-1){
            mod = mulMOD(mod, mod, n);
            temp *= 2;
                
        }
        if(mod != n-1){
            return false;
        }  
    }
    return true;
}
        `
    },
    {tags:'dfs graph connected components',
    code:`
unordered_map<int,int> vis;
unordered_map<int,set<int>> g;

void dfs(int i ){
    vis[i]  = true;
    for(int el: g[i]){
        if(!vis[el]){
            dfs(el);
        }
    }
}
int main(){
    int n,m;
    cin>>n>>m;

    for(int i = 0; i<m;i++){
        int a ,b;cin>>a>>b;
        g[a].insert(b);
        g[b].insert(a);
    }

    int cc = 0; 
    for(int i =1 ;i<=n;i++){
        if(!vis[i]){
            dfs(i);
            cc++;
        }
    }
}    
    `    
}
]