import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import "fontsource-open-sans"
import AccountCircle from "@material-ui/icons/AccountCircle"
import Box from "@material-ui/core/Box"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import Brightness7Icon from "@material-ui/icons/Brightness7"
import ThemeContext from "../context/ThemeContext"

const Header = ({ siteTitle, height, minWidth }) => {
  let [dark,setDark] = useState(false)
  const useStyles = makeStyles(theme => ({
    root: {
      // flexGrow: 1,
      // height:'8vh',
    },
    menuButton: {
      // marginBottom:31,
      marginRight: theme.spacing(2),
    },
    title: {
      fontSize: 15,
      // paddingBottom:20,
      // marginBottom:20,
      marginLeft: 20,
      marginRight: 20,
      color:(dark)?"white":"black",
      fontFamily: "Open Sans",
      textDecoration: "none",
      // flexGrow: 1,
    },
    menuOptions: {
      textDecoration: "none",
      paddingRight: 20,

      fontSize: 12,
      color: (dark)?"#569CD6":"#546E7A",
      fontFamily: "Open Sans",
      // paddingBottom:18,
      // marginBottom:18
    },
    AccountButton: {
      // marginBottom:20,
      borderRadius: 2,
      float: "right",
    },
  }))
  
  const classes = useStyles()
  return (
    <ThemeContext.Consumer>
      {theme => {
        setDark(theme?.dark)
        return(
        <Box borderBottom={1} color="gray">
          <AppBar
            position="relative"
            style={{ height: height, minWidth }}
            className={classes.root}
            color="transparent"
            elevation={0}
          >
            <Toolbar
              disableGutters={true}
              variant="dense"
              style={{ minHeight: height }}
            >
              <Link to="/" className={classes.title}>
                {siteTitle}
              </Link>
              {/* <Link className={classes.menuOptions} to="/roadmap"> */}
                {/* Road Map */}
              {/* </Link> */}
              {/* <Link className={classes.menuOptions} to="/train">
                Train
              </Link> */}
              {/* <Link className={classes.menuOptions} to="/contests">
                Contests
              </Link> */}
              <Link className={classes.menuOptions} to="/defaultTemplate">
                Default Template
              </Link>
              {/* <Link className={classes.menuOptions} to="/login"> */}
                {/* Login */}
              {/* </Link> */}

              <Link className={classes.menuOptions} to="/ide">
                IDE
              </Link>

              <div style={{ flexGrow: 1 }}></div>

              <IconButton
                className={classes.AccountButton}
                onClick={theme.toggleDark}
              >
                {theme?.dark ? (
                  <Brightness7Icon fontSize="small" style={{color:'white'}}/>
                ) : (
                  <Brightness4Icon fontSize="small" />
                )}
              </IconButton>

              {/* <IconButton className={classes.AccountButton}>
                <AccountCircle fontSize="small" />
              </IconButton> */}
            </Toolbar>
          </AppBar>
        </Box>
      )}}
    </ThemeContext.Consumer>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
