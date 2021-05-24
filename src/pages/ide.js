import React, { useEffect, useState } from "react"
import ThemeContext from "./../context/ThemeContext"
import IDEView from './ideView';
import queryString from "query-string"

const IDE = () => {
  let [sampleTestInputs, setSampleTestInputs] = useState("")
  let [sampleTestOutputs, setSampleTestOutputs] = useState("")
  let [isLoading, setLoading] = useState(true)
  let [selectedTab, setSelectedTab] = useState(1)
  let [output, setOutput] = useState([])
  let [isRoughTab,setRoughTab] = useState(false);
  let [id, setId] = useState("ide")

  let [searchSnippet, setSearchSnippet] = useState("")

 
  useEffect(() => {
    console.log(id)
    console.log(queryString.parse(window?.location?.search||""))
    setId("ide"+queryString.parse(window?.location?.search||"")["id"])
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


  return (
    <ThemeContext.Consumer>
      {theme => (
        <IDEView
          id={id}
          theme ={theme}
          isLoading={isLoading}
          output={output}
          searchSnippet={searchSnippet}
          setSampleTestInputs={setSampleTestInputs}
          setSampleTestOutputs={setSampleTestOutputs}
          setSearchSnippet={setSearchSnippet}
          sampleTestInputs={sampleTestInputs}
          selectedTab = {selectedTab}
          setSelectedTab={setSelectedTab}
          getSampleInputsOutputs={getSampleInputsOutputs}
          setOutputAtParent={setOutputAtParent}
          isRoughTab={isRoughTab}
          setRoughTab={setRoughTab}
        />
      )}
    </ThemeContext.Consumer>
  )
}

export default IDE
