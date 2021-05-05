import React from "react"
import SEO from "../components/seo"
import TextField from "@material-ui/core/TextField"
import { useState } from "react"
import { navigate } from 'gatsby';
import Layout from "../components/layout"

export default function Landing(theme) {
  let [id, setID] = useState("")
  theme = theme.theme;
  return (
    <div style={{
      backgroundColor: (theme?.dark) ? "#1E1E1E" : "white",
      height: '100vh',

    }}>
      <Layout >

        <SEO title="Home" />
        <br />
        <h4 style={{ color: (theme?.dark) ? "#D4D4D4" : "white" }}>enter problem ID and press Enter</h4>
        <TextField
          variant="outlined"
          label="Problem ID"
          value={id}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              navigate(`problem/?id=${id}`)
            }
          }}
          style={{
            color:(theme?.dark)?"#D4D4D4":null
          }}

          inputProps={{
            style: {
              fontSize: 14,
              color:(theme?.dark)?"#D4D4D4":null,
              borderColor:(theme?.dark)?"#D4D4D4":null
              
            },
          }}
          onChange={ev => {
            setID(ev.target.value)
          }}
        />
        {/* <p>Welcome to Code Track.</p> */}
      </Layout>

    </div>
  )
}
