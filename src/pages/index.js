import React from "react"
import Layout from "../components/layout"
import ThemeContext from "./../context/ThemeContext"
import Landing from "./landing"

const IndexPage = () => (
  <ThemeContext.Consumer>
    {theme => {

      return(


      <Landing theme={theme} />

    )}}

  </ThemeContext.Consumer>
)

export default IndexPage
