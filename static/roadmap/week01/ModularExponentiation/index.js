export let ModularExponentiationNotes  =`
<h2>Modular Exponentiation</h2>
<p>What is the fastest way to compute a large integer power of a number modulo m?</p>
<p>Sometimes, we need to calculate reminder of a number raised to an integer power.  </p>
<p>$$$$$$x^y mod m$$$$$$</p>
<p>One way to do this is iteratively multiply the base and take reminder with mod at each step. </p>
<pre><code class="lang-cpp"><span class="hljs-built_in">int</span> modExpo (<span class="hljs-built_in">int</span> x, <span class="hljs-built_in">int</span> y, <span class="hljs-built_in">int</span> m) {
    long long <span class="hljs-literal">result</span> = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">int</span> i=<span class="hljs-number">0</span>; i &lt; y; i++) {
        <span class="hljs-literal">result</span> = (<span class="hljs-literal">result</span> * x) % m;
    <span class="hljs-keyword">return</span> <span class="hljs-literal">result</span>;
}
</code></pre>
<p>However, this algorithm is performing in linear time, $O(y)$. So, for really large powers, performance would be fairly slow.  </p>
<p>We can reduce time complexity to $O(\log_2{y})$ by using what is called as exponentiation by squaring. </p>
<h3 id="exponentiation-by-squaring">Exponentiation by squaring</h3>
<p>Basic idea of exponentiation by squaring is</p>
<p><img src="http://nadide.github.io/assets/img/algo-image/modExpo/expo-by-square.png" alt="expo-by-square"></p>
<p>If power is 0, algorithm should return 1. It is the base case, other cases will built on it.  </p>
<p>Other than it, at each step we are dividing the exponent by two and square the base, and then for the case where the exponent is odd you multiply the result by the base. </p>
<p>At each step we pretty much cut the problem in half, adding an extra multiplication for odd numbers. So, complexity of algorithm become $O(\log_2{y})$.</p>
<p>You can implement algorithm in two ways, recursively or iteratively.</p>
<h4 id="recursive-version">Recursive Version</h4>
<pre><code class="lang-cpp"><span class="hljs-function"><span class="hljs-keyword">long</span> <span class="hljs-keyword">long</span> <span class="hljs-title">modExpo</span> <span class="hljs-params">(<span class="hljs-keyword">int</span> x, <span class="hljs-keyword">int</span> y, <span class="hljs-keyword">int</span> m)</span> </span>{
    <span class="hljs-keyword">if</span> (y == <span class="hljs-number">0</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (y%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>) 
        <span class="hljs-keyword">return</span> modExpo (x*x, y/<span class="hljs-number">2</span>, m) % m;
    <span class="hljs-keyword">else</span> 
        <span class="hljs-keyword">return</span> ((x%m) * modExpo (x*x, (y<span class="hljs-number">-1</span>)/<span class="hljs-number">2</span>, m)) % m;
}
</code></pre>
<p>Recursive version is relatively slow, so iterative version is recommended.</p>
<h4 id="iterative-version">Iterative Version</h4>
<pre><code class="lang-cpp"><span class="hljs-function"><span class="hljs-keyword">long</span> <span class="hljs-keyword">long</span> <span class="hljs-title">modExpo</span> <span class="hljs-params">(<span class="hljs-keyword">int</span> x, <span class="hljs-keyword">int</span> y, <span class="hljs-keyword">int</span> m)</span> </span>{
    <span class="hljs-keyword">if</span> (y == <span class="hljs-number">0</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;

    <span class="hljs-keyword">long</span> <span class="hljs-keyword">long</span> res = <span class="hljs-number">1</span>;
    x = x % m;
    <span class="hljs-keyword">while</span> (y &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">if</span> (y%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>) { 
            x = (x * x) % m;
            y = y/<span class="hljs-number">2</span>;
        }
        <span class="hljs-keyword">else</span> {
            res = (res * x) % m
            x = (x * x) % m; 
            y = y/<span class="hljs-number">2</span>;
       }
    }
    <span class="hljs-keyword">return</span> res;
}
</code></pre>
<p>And here’s the most optimized iterative version:</p>
<pre><code class="lang-cpp"><span class="hljs-function"><span class="hljs-keyword">long</span> <span class="hljs-keyword">long</span> <span class="hljs-title">modExpo</span> <span class="hljs-params">(<span class="hljs-keyword">int</span> x, <span class="hljs-keyword">int</span> y, <span class="hljs-keyword">int</span> m)</span> </span>{
    <span class="hljs-keyword">if</span> (y == <span class="hljs-number">0</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;

    x = x % m;
    <span class="hljs-keyword">long</span> <span class="hljs-keyword">long</span> res = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">while</span> (y &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">if</span> (y%<span class="hljs-number">2</span>)
            res = (res * x) % m;
        x = (x * x) % m; 
        y = y/<span class="hljs-number">2</span>;
    }
    <span class="hljs-keyword">return</span> res;
}
</code></pre>
<h4 id="tip-">Tip:</h4>
<p>At most of the competitive programming questions ask to output for large number as modulo $10^9+7$. Why?
You can check <a href="https://www.quora.com/What-exactly-is-print-it-modulo-10-9-+-7-in-competitive-programming-websites">this quora question</a> for answer.</p>
`