import React, { useState } from 'react'
import Layout from '../components/layout'
import { useCookies } from 'react-cookie'
import { navigate } from 'gatsby'
import ThemeContext from "./../context/ThemeContext"
import SEO from "../components/seo"

const Login = ({ location }) => {
  let [handle, setHandle] = useState('')
  let [pass, setPass] = useState('');
  const [, setCookie,] = useCookies(['handle', 'pass']);

  function updateHandle(event) {
    setHandle(event.target.value);
  }
  function updatePass(event) {
    setPass(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    let nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 2);
    setCookie('pass', pass, { expires: nextMonth });
    setCookie('handle', handle, { expires: nextMonth });
    // console.log(location.state.redirectURL)
    if (location?.state?.redirectURL == null) {
      navigate('../');
    }
    else
      navigate(location.state.redirectURL)

  }
  return (

    <ThemeContext.Consumer>
      {theme => (
        <div style={{
          backgroundColor: (theme?.dark) ? "#1E1E1E" : "white",
          height: '100vh',
          textAlign:'center'
        }}>
          <SEO title={`Login to Codeforces`}></SEO>

          <Layout>
            <h1 style={{ color: (theme?.dark) ? "#D4D4D4" : "white" }}>Log in to Codeforces</h1>
            <h5 style={{ color: (theme?.dark) ? "#D4D4D4" : "white" }}>We don't collect your username or password. We just use them to login to codeforces and submit your code</h5>
            <h6 style={{ color: (theme?.dark) ? "#D4D4D4" : "white" }}>Your username and password is saved in your local browser as a cookie, so that you don't need to enter them each time you hit submit</h6>
            <form
              onSubmit={handleSubmit}
            >
              <label style={{ color: (theme?.dark) ? "#D4D4D4" : "white" }}>
                Handle &emsp;
              <input type="text" name="username" onChange={updateHandle} />
              </label>
              <br />
              <label style={{ color: (theme?.dark) ? "#D4D4D4" : "white" }}>
                Password &emsp;
              <input
                  type="password"
                  name="password"
                  onChange={updatePass}
                />
              </label>
              <br />
              <input type="submit" value="Log In" onClick />
            </form>
          </Layout>

        </div>
      )
      }

    </ThemeContext.Consumer>


  )
}
export default Login;