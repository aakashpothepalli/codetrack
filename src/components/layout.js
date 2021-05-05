/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "fontsource-open-sans"
import Header from "./header"
import "./layout.css"

const Layout = ({ children ,widthProp}) => {

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header height = "43px" minWidth='870px' siteTitle={data.site.siteMetadata?.title || `Title`} />
     
          <div style={{paddingLeft:'1.2rem',paddingRight:'1.2rem'}}>{children}</div>
         </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
