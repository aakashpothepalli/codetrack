import React from 'react';
import Layout from '../../../components/layout'
import parse from 'html-react-parser'
import {week01} from '../../../../static/roadmap/week01/index'
const Week01 = ()=>{
    return(
    <Layout>
        <p>{parse(week01)}</p>
    </Layout>)
}

export default Week01;