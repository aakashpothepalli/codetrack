import React, { useEffect } from "react"

import Fuse from "fuse.js"
import { snippets } from "./../../../static/snippets.js"
import Editor from "@monaco-editor/react"
import ThemeContext from "./../../context/ThemeContext"

function loadSnippets(result, search,dark) {
  if (search === "") {

    return snippets.map(snip => (
      <div style={{ margin: 20 }}>
        <Editor
          // width="80%"
          theme={dark?"vs-dark":"vs-light"}
        key={Math.random()}
          options={{
            lineNumbers: "off",
            glyphMargin: false,
            folding: false,
          }}
          height={200}
          language="cpp"
          value={snip["code"]}
        />
      </div>
    ))
  } else if (result.length == 0) {
    return <p style={{              color:(dark)?"#D4D4D4":null
  }}>No snippets found for {search}</p>
  } else
    return result.map(snip => {
      
      return (
        <div style={{ margin: 20 }}>
          <Editor
            // width="80%"
            key = {Math.random()}
            // dark={dark}
            options={{
              lineNumbers: "off",
              glyphMargin: false,
              folding: false,
            }}
            height={200}
            language="cpp"
            theme={dark?"vs-dark":"vs-light"}
            value={snip.item["code"]}
          />
        </div>
      )
    })
}
export default function Snippet({ search }) {
  const fuse = new Fuse(snippets, { keys: [{ name: "tags", weight: 1 }] })
  const result = fuse.search(search)

  return (
    <ThemeContext.Consumer>
      {theme => (
        <div style={{ overflowY: "scroll", height: "calc(100vh - 188px)" }}>
          {loadSnippets(result, search,theme?.dark)}
        </div>
      )}
    </ThemeContext.Consumer>
  )
}
