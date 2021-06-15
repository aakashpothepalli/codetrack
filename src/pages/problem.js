import React, { useEffect, useState } from "react"
// import { globalHistory} from "gatsby"
import queryString from "query-string"
import ThemeContext from "./../context/ThemeContext"
import axios from "axios"
import ProblemView from "./problemView"

const Problem = ({ location }) => {
  let [cfhtml, setcfhtml] = useState("")
  let [sampleTestInputs, setSampleTestInputs] = useState("")
  let [sampleTestOutputs, setSampleTestOutputs] = useState("")
  let [isLoading, setLoading] = useState(true)
  let [selectedTab, setSelectedTab] = useState(0)
  let [output, setOutput] = useState([])
  let [isRoughTab,setRoughTab] = useState(false);
  let [problemScrollPos,setProblemScrollPos] = useState(52)
  let [id, setId] = useState(
    typeof window !== `undefined`
      ? queryString.parse(location.search)["id"]
      : ""
  )
  let [searchSnippet, setSearchSnippet] = useState("")

  useEffect(() => {
    console.log(id)
    console.log(queryString.parse(location.search))
    setId(queryString.parse(location.search)["id"])
    parseProblem()
  }, [])

  function getSampleInputsOutputs() {
    // console.log(sampleTestInputs)
    return [sampleTestInputs, sampleTestOutputs]
  }

  function setOutputAtParent(val) {
    console.log(val)
    setOutput(val)
    if (val.length != 0) setSelectedTab(2)
  }

  function parseProblem() {
    setLoading(true)
    axios
      .get(`/api/cfparseproblem?id=${id}`)
      .then(res => {
        console.log(res.data)
        setcfhtml(res.data["html"])
        setSampleTestInputs(res.data["sampleInputs"])
        setSampleTestOutputs(res.data["sampleOutputs"])
        setLoading(false)
 
        //refresh latex
        setTimeout(() => {
          setSelectedTab(1)
          setSelectedTab(0)
        }, 1000)
      })
      .catch(err => {
        console.log(err.response)
        // res.statusCode = err.status;
        if (err.response.status === 500) {
          setcfhtml("<div>Server down.. Pls try again later</div>")
          setLoading(false)
          return
        } else if (err.response.status === 400 || err.response.status === 404) {
          // console.log(err.response)
          setcfhtml(err.response.data)
          setLoading(false)
          return
        }
      })
  }

  function refreshLatex() {
    setSelectedTab(4)
    setTimeout(() => {
      setSelectedTab(0)
    }, 50)
  }
  return (
    <ThemeContext.Consumer>
      {theme => (
        <ProblemView
          id={id}
          theme ={theme}
          cfhtml={cfhtml}
          isLoading={isLoading}
          output={output}
          searchSnippet={searchSnippet}
          setSampleTestInputs={setSampleTestInputs}
          setSampleTestOutputs={setSampleTestOutputs}
          setSearchSnippet={setSearchSnippet}
          sampleTestInputs={sampleTestInputs}
          selectedTab = {selectedTab}
          setSelectedTab={setSelectedTab}
          refreshLatex={refreshLatex}
          getSampleInputsOutputs={getSampleInputsOutputs}
          setOutputAtParent={setOutputAtParent}
          isRoughTab={isRoughTab}
          setRoughTab={setRoughTab}
          problemScrollPos={problemScrollPos}
          setProblemScrollPos = {setProblemScrollPos}
        />
      )}
    </ThemeContext.Consumer>
  )
}

export default Problem
