import React from 'react';
import Layout from '../../../components/layout'
import Latex from '../../../components/Latex'
import MyEditor from '../../../components/problem/editor';
import {ModularExponentiationNotes} from '../../../../static/roadmap/week01/ModularExponentiation/index'
import {medemo1} from '../../../../static/roadmap/week01/ModularExponentiation/code1'

import SEO from '../../../components/seo';
import parse from 'html-react-parser'
const ModularExponentiation = ()=>{
  
    return(
    <Layout>
        <SEO title="Modular Exponentiation" description="Calculating one number to the power of another number modulo M in O(log n) time " />
        <Latex>
           <p> {parse(ModularExponentiationNotes)} </p>
        </Latex>
            <h4>C++ Implementation</h4>
            <MyEditor demo={true} id="medemo1" value={medemo1}/>
            <br/>
        <h3>Solve it Yourself</h3>

        <li><a href="https://www.hackerrank.com/challenges/power-of-large-numbers">Power of Large Numbers</a></li>
        <br/>
        <h3 id="other-study-sources">Other Study Sources</h3>
        <ul>
        <li><a href="https://www.topcoder.com/community/data-science/data-science-tutorials/primality-testing-non-deterministic-algorithms/">Topcoder</a> </li>
        <li><a href="https://www.youtube.com/watch?v=nO7_qu2kd1Q">Video Tutorial</a></li>
        <li><a href="https://www.geeksforgeeks.org/modular-exponentiation-power-in-modular-arithmetic/">GeeksForGeeks</a></li>
        </ul>
        <br/>
    </Layout>)
}

export default ModularExponentiation;