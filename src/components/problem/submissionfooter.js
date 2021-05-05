import React, { useState } from "react"

import Button from "@material-ui/core/Button"

import { makeStyles } from "@material-ui/core/styles"
import ThemeContext from "./../../context/ThemeContext"

const SubmissionFooter = ({ id }) => {
  let [dark, setDark] = useState(false)
  const useStyles = makeStyles(theme => ({
    root: {
      paddingTop: 2,
    },

    button2: {
      backgroundColor: dark ? "#1E1E1E" : "#FAFAFA",
      color: dark ? "#D4D4D4" : "#455A64",
      fontSize: 12,
      float:'right',
      height: 32,
      flexGrow: 1,
      borderColor: "#455A64",
      "&:hover": {
        backgroundColor: dark ? "#1E1E1E" : "#F4F5F7",
        borderColor: dark ? "#D4D4D4" : "#455A64",
      },
      textTransform: "none",
    },
    button1: {
        backgroundColor: dark ? "#1E1E1E" : "#FAFAFA",
        color: dark ? "#D4D4D4" : "#455A64",
        fontSize: 12,
        height: 32,
        flexGrow: 1,
        borderColor: "#455A64",
        "&:hover": {
          backgroundColor: dark ? "#1E1E1E" : "#F4F5F7",
          borderColor: dark ? "#D4D4D4" : "#455A64",
        },
        textTransform: "none",
    },
  }))
  let classes = useStyles()

  return (
    <ThemeContext.Consumer>
      {theme => {
        setDark(theme?.dark)
        return (
          <div className={classes.root}>
            <Button
              variant="outlined"
              className={classes.button1}
              disableElevation
              color="primary"
              onClick={() => {
                if (id === undefined || id === null || id.length === 0) {
                  return
                }
                let lastc = id.slice(-1)
                if (lastc == "a" || lastc == "A") {
                  lastc = "Z"
                } else {
                  let ascii = lastc.charCodeAt(0)
                  lastc = String.fromCharCode(ascii - 1)
                }
                window.open(
                  "?id=" + id.substr(0, id.length - 1) + lastc,
                  "_self"
                )
              }}
            >
              {"<"}
            </Button>
            <Button
              variant="outlined"
              className={classes.button2}
              disableElevation
              color="primary"
              onClick={() => {
                if (id === undefined || id === null || id.length === 0) {
                  return
                }
                let lastc = id.slice(-1)
                if (lastc == "z" || lastc == "Z") {
                  lastc = "A"
                } else {
                  let ascii = lastc.charCodeAt(0)
                  lastc = String.fromCharCode(ascii + 1)
                }
                window.open(
                  "?id=" + id.substr(0, id.length - 1) + lastc,
                  "_self"
                )
              }}
            >
              {">"}
            </Button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default SubmissionFooter
