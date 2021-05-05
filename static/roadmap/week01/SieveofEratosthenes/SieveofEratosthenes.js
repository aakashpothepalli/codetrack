export let tutorial  =`
<!--?title Sieve of Eratosthenes -->
<h1 id="sieve-of-eratosthenes">Sieve of Eratosthenes</h1>
<p>Sieve of Eratosthenes is an algorithm for finding all the prime numbers in a segment <strong>[ 1 ; n ]</strong> using <strong>O(n <em>log log</em> n)</strong> operations.</p>
<p>The idea is simple: at the beginning we write down a row of numbers and eliminate all numbers divisible by 2, 
except number 2 itself,  then divisible by 3, except number 3 itself, next by 5, 7, 11, 
and all the remaining prime numbers till <strong><em>n</em></strong>.</p>
<p>##Implementation</p>
<pre><code class="lang-cpp">int n;
vector&lt;char&gt; prime (n + <span class="hljs-number">1</span>, true);
prime[<span class="hljs-number">0</span>] = prime[<span class="hljs-number">1</span>] = false;
<span class="hljs-keyword">for</span> (int <span class="hljs-built_in">i</span> = <span class="hljs-number">2</span>; <span class="hljs-built_in">i</span> * <span class="hljs-built_in">i</span> &lt;= n; ++<span class="hljs-built_in">i</span>)
    <span class="hljs-keyword">if</span> (prime[i])
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">i</span> * <span class="hljs-number">1</span>ll * <span class="hljs-built_in">i</span> &lt;= n)
            <span class="hljs-keyword">for</span> (int <span class="hljs-built_in">j</span> = <span class="hljs-built_in">i</span> * <span class="hljs-built_in">i</span>; <span class="hljs-built_in">j</span> &lt;= n; <span class="hljs-built_in">j</span> += <span class="hljs-built_in">i</span>)
                prime[j] = false;
</code></pre>
<p>This code firstly marks all numbers except zero and number one as prime numbers, then it begins the process of sifting composite numbers. 
For this purpose we go through all numbers <strong>2</strong> to <strong>n</strong> in a cycle, and if the current number <strong>i</strong> is a prime number, 
then we mark all numbers that are multiple to it as composite numbers.
In doing so, we are starting from <strong>i^2</strong> as all lesser numbers that are multiple to <strong>i</strong> necessary have prime factor 
which is less than <strong>i</strong>, and that means that all of them were sifted earlier.
(Since <strong>i^2</strong> can easily overflow the type <strong>int</strong> the additional verification is done using type <strong>long long</strong> before the second 
nested cycle).</p>
<p>Using such implementation the algorithm consumes <strong>O(n)</strong> of the memory (obviously) and performs <strong>O(n <em>log log</em> n)</strong> 
(this is being proved <a href="https://www.geeksforgeeks.org/how-is-the-time-complexity-of-sieve-of-eratosthenes-is-nloglogn/">here</a>).</p>

`