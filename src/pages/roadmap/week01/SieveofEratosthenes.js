import React from 'react';
import Layout from '../../../components/layout'
import parse from 'html-react-parser'
import {tutorial} from '../../../../static/roadmap/week01/SieveofEratosthenes/SieveofEratosthenes'
import MyEditor from '../../../components/problem/editor';
import {code1} from '../../../../static/roadmap/week01/SieveofEratosthenes/codes/1';
import {code2} from '../../../../static/roadmap/week01/SieveofEratosthenes/codes/2';
import {code3} from '../../../../static/roadmap/week01/SieveofEratosthenes/codes/3';
import {sol1} from '../../../../static/roadmap/week01/SieveofEratosthenes/codes/sol1';
import {sol2} from '../../../../static/roadmap/week01/SieveofEratosthenes/codes/sol2';
import {sol3} from '../../../../static/roadmap/week01/SieveofEratosthenes/codes/sol3';

import SEO from '../../../components/seo';
import IOComponent from '../../../components/problem/io';

const SieveofEratosthenes = ()=>{
  
 
    function getSampleInputsOutputs1(){
        return [["3 10","5 15","14 26"],["3 5 7","5 7 11 13","17 19 23"]];
    }
    function getSampleInputsOutputs2(){
        return [['2\n1\n2\n'],['30\n42']]
    }
    function getSampleInputsOutputs3(){
        return [["27 2","45 7"],["YES","NO"]]
    }
    return(
    <Layout>
        <SEO title="Sieve of Eratosthenes" description="Sieve of Eratosthenes is an algorithm for finding all the prime numbers in a segment [ 1 ; n ] using O(n log log n) operations" />
        <p>{parse(tutorial)}</p>
        <h4>C++ Implementation </h4>
        <MyEditor height={400}  demo={true}  value={code1} />
        <br/>
        <h4>C Implementation </h4>
        <MyEditor lang ='c' height={400} demo={true} value={code2} />
        <br/>
        <h4>Java Implementation </h4>
        <MyEditor lang ='java' height={400} demo={true} value={code3}/>
        <br/>
        <hr/>
        <h3>Solve it Yourself</h3>
        <br/>
        <h4>Q1</h4>
        <p>Given a range of integers by its lower and upper limit, construct a list of all prime numbers in that range.</p>
        <h5>Sample Input</h5>
        <p>3 10</p>
        <h5>Sample Output</h5>
        <p>3 5 7 </p>
        <MyEditor height={400}  id={'soe1'} />
        <br/>
        <IOComponent id={'soe1'} getSampleInputsOutputs={getSampleInputsOutputs1} hideCFSubmit={true} />
        <details>
            <summary>Solution</summary>
            <MyEditor height={400}  demo={true} id={'soesol1'} value={sol1} />


        </details>
        <br/>
        <h4>Q2</h4>
        <p>Arithmancy is Draco Malfoy's favorite subject, but what spoils it for him is that Hermione Granger is in his class, and she is better than him at it. Prime numbers are of mystical importance in Arithmancy, and Lucky Numbers even more so. Lucky Numbers are those positive integers that have at least three distinct prime factors; 30 and 42 are the first two. Malfoy's teacher has given them a positive integer n, and has asked them to find the n-th lucky number. Malfoy would like to beat Hermione at this exercise, so although he is an evil git, please help him, just this once. After all, the know-it-all Hermione does need a lesson.</p>
        
        <h5>Input</h5>
        <p>The first line contains the number of test cases T. Each of the next T lines contains one integer n.</p>
        <h5>Output</h5>
        <p>Output T lines, containing the corresponding lucky number for that test case.</p>

        <h5>Constraints</h5>
        <p>{'1 <= T <= 20 ,  1 <= n <= 1000'}</p>
        <h5>Sample Input</h5>
        <p>2<br/>1<br/>2</p>
        <h5>Sample Output</h5>
        <p>30<br/>42 </p>
        <MyEditor height={400}  id={'soe2'}  />
        <br/>
        <IOComponent id={'soe2'} url = "https://www.spoj.com/problems/AMR11E/" getSampleInputsOutputs={getSampleInputsOutputs2} hideCFSubmit={true} />
        
        <details>
            <summary>Solution</summary>
            <MyEditor height={400}  demo={true} id={'soesol3'} value={sol2} />
        </details>
        <br/>


        <h4>Q3</h4>
        <p>Nick is interested in prime numbers. Once he read about Goldbach problem. It states that every even integer greater than 2 can be expressed as the sum of two primes. That got Nick's attention and he decided to invent a problem of his own and call it Noldbach problem. Since Nick is interested only in prime numbers, Noldbach problem states that at least k prime numbers from 2 to n inclusively can be expressed as the sum of three integer numbers: two neighboring prime numbers and 1. For example, 19 = 7 + 11 + 1, or 13 = 5 + 7 + 1.</p>
        <p>Two prime numbers are called neighboring if there are no other prime numbers between them.</p>
        <p>You are to help Nick, and find out if he is right or wrong.</p>
        
        <h5>Input</h5>
        <p>The first line of the input contains two integers n (2 ≤ n ≤ 1000) and k (0 ≤ k ≤ 1000).</p>
        <h5>Output</h5>
        <p>Output YES if at least k prime numbers from 2 to n inclusively can be expressed as it was described above. Otherwise output NO.</p>

        <h5>Sample Input</h5>
        <p>27 2</p>
        <h5>Sample Output</h5>
        <p>YES </p>

        <h5>Sample Input</h5>
        <p>45 7</p>
        <h5>Sample Output</h5>
        <p>NO</p>
        <MyEditor height={400}  id={'soe3'}  />
        <br/>
        <IOComponent id={'soe3'} url = "https://codeforces.com/problemset/problem/17/A?locale=en" getSampleInputsOutputs={getSampleInputsOutputs3} hideCFSubmit={true} />
        
        <details>
            <summary>Solution</summary>
            <MyEditor height={400}  demo={true} id={'soesol2'} value={sol3} />
        </details>
        <br/>

        <h4 id="other-study-sources">Other Study Sources</h4>
        <ul>
        <li><a href="https://www.youtube.com/watch?v=V08g_lkKj6Q">Youtube - Region 10 ESC</a></li>
        <li><a href="http://www.geeksforgeeks.org/sieve-of-eratosthenes/">GeeksForGeeks</a></li>
        <li><a href="https://www.topcoder.com/community/competitive-programming/tutorials/prime-numbers-factorization-and-euler-function/">Topcoder</a></li>
        <li><a href="https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html">Cp Algorithms</a></li>

        </ul>

    </Layout>)
}

export default SieveofEratosthenes;