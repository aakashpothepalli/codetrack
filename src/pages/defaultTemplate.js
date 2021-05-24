import React,{useState,useEffect} from 'react'
import Layout from '../components/layout'
import {ControlledEditor} from '@monaco-editor/react'
import editorDefault from '../components/problem/editorDefault'
import SEO from '../components/seo'


function getLocalSavedCode(id){
    console.log(editorDefault)
    let code = localStorage.getItem(id);
    if(code==null)return editorDefault ;
    else return code;
}
  
  function setLocalSavedCode(id,code){
    localStorage.setItem(id,code);
  }

  
const DefaultTemplate=()=>{
    let id = 'defaultTemplate'
    
    // console.log("path "+id)
    let [code,setCode] = useState("")

   
    const handleEditorChange = (ev, value) => {
        setCode(value)
        setLocalSavedCode(id,value);
        return value;
    };
      
    useEffect(()=>{
          if(getLocalSavedCode(id)!==undefined || getLocalSavedCode(id)!==null){
              setCode(getLocalSavedCode(id));
          }
      },[]);
    

     return( <Layout>
         <SEO title="default template"></SEO>
        <h3>Your default template</h3> 
        <h6>Edits are saved automatically</h6>
        <ControlledEditor height={400} language="cpp" theme="vs-dark" value={code} onChange={handleEditorChange}/>

      </Layout>)
}
export default DefaultTemplate;