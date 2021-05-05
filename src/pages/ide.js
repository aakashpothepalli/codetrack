import React, { useEffect, useState } from "react"
import ThemeContext from "./../context/ThemeContext"
import IDEView from './ideView';

const IDE = () => {
  let [sampleTestInputs, setSampleTestInputs] = useState("")
  let [sampleTestOutputs, setSampleTestOutputs] = useState("")
  let [isLoading, setLoading] = useState(true)
  let [selectedTab, setSelectedTab] = useState(1)
  let [output, setOutput] = useState([])
  let [isRoughTab,setRoughTab] = useState(false);
  let [id, setId] = "ide"
  let [searchSnippet, setSearchSnippet] = useState("")

 

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
