import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import "react-splitter-layout/lib/index.css"
import { makeStyles } from "@material-ui/core/styles"
import axios from "axios"
import CircularProgress from "@material-ui/core/CircularProgress"
import { useCookies } from "react-cookie"
import { editorDefault } from "../../../static/editorDefault"
import ThemeContext from "./../../context/ThemeContext"


const RunSubmit = ({ id, getSampleInputsOutputs, setOutputAtParent,isIDE}) => {
    const useStyles = makeStyles(theme => ({
      margin: {
        // margin: theme.spacing(1),
      },
    
      submit: {
        backgroundColor: "#455A64",
        color: "white",
        float: "right",
        fontSize: 12,
        height: 32,
        textTransform: "none",
        "&:hover": {
          backgroundColor: "rgb(84, 110, 122)",
        },
      },
      run: {
        backgroundColor:dark?"#1E1E1E": "#FAFAFA",
        color:dark?"#D4D4D4" :"#455A64",
        fontSize: 12,
        height: 32,
        flexGrow: 1,
        borderColor: "#455A64",
        "&:hover": {
          backgroundColor: dark?"#1E1E1E":"#F4F5F7",
          borderColor: dark?"#D4D4D4" :"#455A64",
        },
        textTransform: "none",
      },
    }))
    let [dark ,setDark] = useState(false)

  let classes = useStyles()
  let [isCompiling, setCompiling] = useState(false)
  let [isSubmitting, setSubmitting] = useState(false)
  let [finalOutput, setFinalOutput] = useState([])
  let code = ""
  const [{ handle, pass }, ,] = useCookies(["handle", "pass"])

  useEffect(() => {
    setOutputAtParent(finalOutput)
  }, [finalOutput])

  async function onRun() {
    code = localStorage.getItem(id)
    if(code===null){
      
      setOutputAtParent(['Please enter your source code'])
      setCompiling(false)
      return false;
    }

    let [sampleTestInputs, sampleTestOutputs] = getSampleInputsOutputs()

    setFinalOutput([])
    console.log(sampleTestInputs)
    console.log(sampleTestOutputs)
    setCompiling(true)

    let promises = []
    if(sampleTestInputs.length==0){
      sampleTestInputs =[""]
    }
    for (let i in sampleTestInputs) {
      promises.push( 
        axios.post("/runcode", {
        // language: "cpp",
        code: code,
        input: sampleTestInputs[i],
        // args: [],
      }).then(res=>{
        console.log(res.data)
        if (res.data["stderr"] !="" && res.data["stderr"]!=null ) {
          setFinalOutput(ar => [...ar, res.data['stderr']])
        }
        else if(res.data["stdout"]===""){
          setFinalOutput(ar => [
            ...ar,
            <p >No Output</p>,
          ])
        }
        else{
          if(isIDE){
            // console.log(res.data)
            setFinalOutput(ar => [
              ...ar,
                <div >
                  {res.data["stdout"].split("\n").map(str => (
                    <h5 >{str}</h5>
                  ))}
                </div>
            ])
          }
          else
          checkOutput(res.data["stdout"],sampleTestOutputs[i])
        }
      }).catch(err=>{
        if(err?.response?.status==429){
          console.log(err.response.status)
          setFinalOutput(ar => [
            ...ar,
            "Server busy.. Please try again later",
          ]);
        }
        else if (err?.response?.status !== 200) {
          console.log(err)
          setFinalOutput(ar => [
            ...ar,
            "Please check your code for errors or try again later",
          ]);
        }
      })
      )
    
    }

    await Promise.all(promises)
    // setOutputAtParent(finalOutput)
    setCompiling(false)
  }
  function sanitize(str) {
    // removes leading, trailing spaces and \n characters from a string
    console.log(str)
    return str.replace(/\n/g, " ").trim()
  }
  function checkOutput(parsedOutput, sampleOutput) {
    console.log(sampleOutput)
    if (sanitize(parsedOutput) === sanitize(sampleOutput)) {
      // setOutputList(ar => [...ar, "Test Case passed!"])
      setFinalOutput(ar => [
        ...ar,
        <p style={{ color: "green" }}>Test Case Passed!</p>,
      ])
    } else {
      let op = ` Your Output\n ${parsedOutput.toString()}`
      let exop = ` Expected Output\n ${sampleOutput.toString()}`
      // setOutputList(currentArray => [...currentArray, op])
      // setExpectedOutputList(currentArray => [...currentArray, exop])
      setFinalOutput(ar => [
        ...ar,
        <>
          <div style={{ display: "inline-block" }}>
            {op.split("\n").map(str => (
              <h5 >{str}</h5>
            ))}
          </div>
          <div style={{ marginLeft: 20, display: "inline-block" }}>
            {exop.split("\n").map(str => (
              <h5 >{str}</h5>
            ))}
          </div>
        </>,
      ])
    }
  }

  function getCode() {
    if (localStorage.getItem(id) === null) {
      localStorage.setItem(id, editorDefault)
      console.log("code empty")
      return editorDefault
    } else return localStorage.getItem(id)
  }

  async function getNoOfSubmissions(contestID) {
    let res = await axios.get(
      `https://codeforces.com/api/contest.status?contestId=${contestID}&handle=${handle}`
    )
    console.log(res.data)
    return res.data["result"].length
  }
  async function watchSubmission(contestID) {
    setFinalOutput(["Submitted!"])

    let res1 = await axios.get(
      `https://codeforces.com/api/contest.status?contestId=${contestID}&from=1&count=1&handle=${handle}`
    )
    console.log(res1.data)

    let interval = setInterval(async () => {
      if (res1.data["result"][0]["verdict"] == "OK") {
        setFinalOutput([<h4 style={{ color: "green" }}>Accepted</h4>])
        clearInterval(interval)
      } else {
        if (res1.data["result"][0]["verdict"] === "TESTING") {
          setFinalOutput(["Testing..."])
        }
        else if(res1.data["result"][0]["verdict"]===undefined){
          setFinalOutput(['In Queue']);
        } 
        else {
          setFinalOutput([
            res1.data["result"][0]["verdict"] +
              " On " +
              (res1.data["result"][0]["passedTestCount"] + 1),
          ])
          clearInterval(interval)
        }
        res1 = await axios.get(
          `https://codeforces.com/api/contest.status?contestId=${contestID}&from=1&count=1&handle=${handle}`
        )
      }
    }, 1000)
  }
  async function onSubmit1() {
    let copy  = require( 'copy-to-clipboard');
    copy(getCode())
    let contestID;
    if(Number.isInteger(id.slice(-1))){
      
      contestID =id.substr(0, id.length - 2) 
    }
    else{
      contestID = id.substr(0, id.length - 1)
    }
    window.open(`https://codeforces.com/contest/${contestID}/submit`, '_blank');

    // submit api is currently down
    // setSubmitting(true)
    // if (
    //   handle === undefined ||
    //   pass === undefined ||
    //   handle === null ||
    //   handle === "" ||
    //   handle === {} ||
    //   Object.keys(handle).length === 0 ||
    //   Object.keys(pass).length === 0
    // ) {
    //   navigate("/login", { state: { redirectURL: `../problem?id=${id}` } })
    // }
    // let curSubmissions = await getNoOfSubmissions(id.substr(0, id.length - 1))
    // // console.log(curSubmissions)
    // setFinalOutput([])
    // let res = await axios.post(
    //   "/api/cfsubmit",
    //   {
    //     problemID: id,
    //     code: getCode(),
    //     handle: handle,
    //     pass: pass,
    //   }
    // ).then(res=>{
    //   console.log(res.data)
    //   if (res.status != 200) {
    //     setFinalOutput([res.data])
    //     return
    //   } else {
    //     let interval1 = setInterval(async () => {
    //       let newSubmissions = await getNoOfSubmissions(
    //         id.substr(0, id.length - 1)
    //       )
    //       console.log(newSubmissions)
    //       if (newSubmissions == curSubmissions + 1) {
    //         setSubmitting(false)
    //         watchSubmission(id.substr(0, id.length - 1))
    //         clearInterval(interval1)
    //       }
    //     }, 1000)
    //   }
    // }).catch(err=>{
    //   if(err.response.status==400){
    //     setSubmitting(false)
    //     setFinalOutput([err.response.data])
    //   }
    // })
    
  }
  return (
    <ThemeContext.Consumer>
      {theme => {
          setDark(theme?.dark)
        return (
          <>
            <Button
              variant="outlined"
              disableElevation
              color="primary"
              className={classes.run}
              onClick={isCompiling ? null : onRun}
            >
              {!isCompiling ? (
                "Run on Test Cases"
              ) : (
                <CircularProgress
                  style={{ color: "#455A64", width: 20, height: 20 }}
                />
              )}
            </Button>

            {(isIDE)?<div/>:<Button
              variant="contained"
              disableElevation
              color="primary"
              className={classes.submit}
              onClick={isSubmitting ? null : onSubmit1}
            >
              {isSubmitting ? (
                <CircularProgress 
                  style={{ color: "white", width: 20, height: 20 }}
                />
              ) : (
                "Submit"
              )}
            </Button>}
          </>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default RunSubmit
