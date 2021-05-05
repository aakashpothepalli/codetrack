import React from 'react';
import Layout from '../../../components/layout'
import Latex from '../../../components/Latex'
import MyEditor from '../../../components/problem/editor';
import {primeFactorization1} from '../../../../static/roadmap/week01/primeFactorization/index'
import SEO from '../../../components/seo';
import { primeFactorization2 } from '../../../../static/roadmap/week01/primeFactorization/index2.js';
import {pfdemo1} from '../../../../static/roadmap/week01/primeFactorization/codes/pfdemo1';
import {pfdemo3} from '../../../../static/roadmap/week01/primeFactorization/codes/pfdemo3';

const PrimeFactorization = ()=>{
  
    return(
    <Layout>
        <SEO title="Efficient Prime Factorization" description="Prime Factorization is finding which prime numbers multiply together to make the original number" />
        <Latex>
            {primeFactorization1}
        </Latex>
            <h4>C++ Implementation</h4>
            <MyEditor demo={true} id="pfdemo1" value={pfdemo1}/>
            <br/><br/> 
            <h4>Java Implementation</h4>
            <MyEditor demo={true} lang = "java" id="pfdemo3" value={pfdemo3}/>
            <br/><br/> 
        <Latex>
            {primeFactorization2}
        </Latex>
    </Layout>)
}

export default PrimeFactorization;