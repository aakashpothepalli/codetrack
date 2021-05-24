import React from 'react';
import Layout from '../components/layout'
import parse from 'html-react-parser'
import {readme} from '../../static/roadmap/readme'
const Roadmap = ()=>{
    return(
    <Layout>
        <p>{parse(readme)}</p>
    </Layout>)
}

export default Roadmap;