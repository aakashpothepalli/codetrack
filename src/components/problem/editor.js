import React, { useEffect, useState } from "react"

import { ControlledEditor } from "@monaco-editor/react"
import {editorDefault} from "../../../static/editorDefault.js"

function getLocalSavedCode(id) {
  let code = localStorage.getItem(id)
  
  if (code == null) {
    if (localStorage.getItem("defaultTemplate") == null) {
      
        localStorage.setItem(id, editorDefault)
      return editorDefault
    } else {
      if(id.search('rough')!=-1){
        console.log('rough')
      }
      else 
      return localStorage.getItem("defaultTemplate")
    }
  } else return code
}

function setLocalSavedCode(id, code) {
  localStorage.setItem(id, code)
}

const MyEditor = ({dark, id, height = 400, value, lang = "cpp", demo }) => {
  // console.log("path "+id)
  let [code, setCode] = useState("")

  const handleEditorChange = (ev, value) => {
    setCode(value)
    if (demo === true) return value // when editor is used to just show the code
    setLocalSavedCode(id, value)
    // console.log(value);
    return value
  }

  useEffect(() => {
    console.log(id)
    // console.log(getLocalSavedCode(id))

    if (value !== undefined && value !== "" && value !== null) {
      setCode(value)
    } else {
      setCode(getLocalSavedCode(id))
    }
  }, [])

  return (
    <div style={{ paddingBottom: 5, position: "relative" }}>
      <ControlledEditor
      // key={Math.random()}
        height={height}
        language={lang}
        theme={dark?"vs-dark":"vs-light"}
        value={code}
        onChange={handleEditorChange}
      />
    </div>
  )
}

export default MyEditor
