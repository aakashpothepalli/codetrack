import React,{useEffect, useState} from "react"
// import { Link } from "gatsby"
import Button from "@material-ui/core/Button"
import 'react-splitter-layout/lib/index.css';
import {makeStyles} from '@material-ui/core/styles'
import axios from "axios"
import CircularProgress from '@material-ui/core/CircularProgress';
import {useCookies} from 'react-cookie'
import {navigate} from 'gatsby'
import editorDefault from './editorDefault.js'
import parse from 'html-react-parser'
 
 const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  run:{
    flexGrow:1,
    fontSize:12
    
  },
  submit:{
    backgroundColor:'green',
    color:'white',
    float:'right',
    fontSize:12
  }
}));


const IOComponent = ({id,getSampleInputsOutputs,hideCFSubmit,url}) => {
    let classes = useStyles();
    let [isCompiling,setCompiling] = useState(false);
    let [isSubmitting,setSubmitting] = useState(false);
    let [accepted,setAccepted] = useState(false)
    let [outputList,setOutputList] = useState([])
    let [expectedOutputList,setExpectedOutputList] = useState([])
    let code = ""
    let sampleTestInputs = [];
    let sampleTestOutputs=[];
    const [{handle,pass}, , ] = useCookies(['handle','pass']);

    async function onRun(){
        code = getCode();
        setAccepted(false);
        // console.log(getSampleInputsOutputs())
        [sampleTestInputs,sampleTestOutputs] = getSampleInputsOutputs();
        
        setOutputList([])
        setExpectedOutputList([])
        console.log(sampleTestInputs);
        console.log(sampleTestOutputs)
        setCompiling(true);
        for(let i in sampleTestInputs){

            let res = await axios.post('https://codexweb.netlify.app/.netlify/functions/enforceCode',
            JSON.stringify({
                "language": "cpp",
                "code": code,
                "input": sampleTestInputs[i],
                // "args": []
            }),)
            console.log(res.data)
            if(res.status!==200){
                console.log(res.status);
                setOutputList(ar=>[...ar,"Please check your code for errors or try again later"]);
                continue;
            }
            if(res.data['stderr']==='killed'){
                setOutputList(ar=>[...ar,"TLE on ",sampleTestInputs[i]]);
                continue;
            }

            checkOutput(res.data['output'],i);
        }

        setCompiling(false);
    
    }
    function sanitize(str){
        // removes leading, trailing spaces and \n characters from a string 
        return str.replace(/\n/g," ").trim()
    }
    function checkOutput(parsedOutput,i){
        
        if(sanitize(parsedOutput)===sanitize(sampleTestOutputs[i])){
            setOutputList(ar=>[...ar,"Test Case passed!"]);
        }
        else{
            let op = ` Your Output\n ${(parsedOutput.toString())}`;
            let exop = ` Expected Output\n ${sampleTestOutputs[i].toString()}`;
            setOutputList(currentArray => [...currentArray, op])
            setExpectedOutputList(currentArray=>[...currentArray,exop])
        }
    }

    function getCode(){
        if(localStorage.getItem(id)===null){
            localStorage.setItem(editorDefault)
            console.loglog("code empty")
            return editorDefault
        }
        else return localStorage.getItem(id)
    }
   
    return(
        <>
            <Button variant="contained" color="primary" className={classes.run} onClick={isCompiling?null:onRun}>
                {(!isCompiling)?'Run on Test Cases':(<CircularProgress  style={{color:'white'}}/>)}
            </Button>

            <Button variant = "contained" color = "primary" className = {classes.submit} onClick={()=>window.open(url)}>Submit on the official website</Button>
            
            <br/>
            <br/>
          {(accepted)?(<h3 style={{color:'green'}}>All Sample Test Cases Passed!</h3>):(
            <>
            <div style={{display:'inline-block'}}>           
                {outputList.map(output1=> output1.split('\n').map(str=>(<h5 key={''+Math.random()}>{str}</h5>)))}
            </div>
            <div style={{marginLeft:20,display:'inline-block'}}> 
                {expectedOutputList.map(expectedOutput1=>expectedOutput1.split('\n').map(str=>(<h5 key={''+Math.random()}>{str}</h5>))) }
            </div>
            </>
            )}

        </>
    )}

export default IOComponent
