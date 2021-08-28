import React from "react"
import Layout from "../components/layout"
import MyEditor from "../components/problem/editor"
import Split from "react-split-it"
import SEO from "../components/seo"
import DescriptionIcon from "@material-ui/icons/Description"
// import AssignmentIcon from '@material-ui/icons/Assignment';
import "react-splitter-layout/lib/index.css"
import "react-tabs/style/react-tabs.css"
import "./problem.css"
import Latex from "../components/Latex"
import {
  AppBar,
  Button,
  CircularProgress,
  Icon,
  TextField,
  Toolbar,
} from "@material-ui/core"
import RunSubmit from "../components/problem/runSubmit"
import WebAssetIcon from "@material-ui/icons/WebAsset"
import KeyboardIcon from "@material-ui/icons/Keyboard"
import FlashOnIcon from "@material-ui/icons/FlashOn"
import CodeIcon from '@material-ui/icons/Code';
import AssignmentIcon from '@material-ui/icons/Assignment';
import parse from "html-react-parser"
import Snippet from "./../components/problem/snippet"
import Box from "@material-ui/core/Box"
import SubmissionFooter from "./../components/problem/submissionfooter"
import StressTest from "./../components/problem/stressTest"
let ProblemView = ({
  id,
  isLoading,
  cfhtml,
  output,
  sampleTestInputs,
  searchSnippet,
  setSampleTestOutputs,
  setSearchSnippet,
  setSampleTestInputs,
  setSelectedTab,
  refreshLatex,
  getSampleInputsOutputs,
  setOutputAtParent,
  selectedTab,
  theme,
  isRoughTab,
  setRoughTab,
  setProblemScrollPos,
  problemScrollPos
}) => {

  function getCodeTab(){
    if(!isRoughTab){
     return (<MyEditor key={id} height="calc(100vh - 131px)" dark={theme?.dark} id={id} />)
    }
    else{
      return (<MyEditor key ={id+'rough'} height="calc(100vh - 131px)" dark={theme?.dark} id={id+'rough'} />      )
    }
  }
 

  let ProblemComponent = (<div        
    style={{
      fontSize: 15,
      // overflowY: "scroll",
      overflowX: "hidden",
      height: "calc(100vh - 137px)",
      color: (theme?.dark) ? "#D4D4D4" : null
    }}
  >
    {isLoading ? (
      <div style={{ margin: "0 auto" }}>
        <CircularProgress />
      </div>
    ) : (<Latex >
      {parse(cfhtml||"")}
    </Latex>)}
  </div>) 

  let InputComponent =  (
    <div style={{ height: "calc(100vh - 137px)" ,overflowY:'scroll'}}>
    <TextField
      variant="outlined"
      style={{
        // color: "#E0E0E0",
        color: (theme?.dark) ? "white" : null
        
      }}
      inputProps={{
        style: {
          fontSize: 14,
          color: (theme?.dark) ? "#D4D4D4" : null,
          borderColor: (theme?.dark) ? "#D4D4D4" : null
          
        },
      }}
      onChange={ev => {
        let ar = ev.target.value.split(",")
        console.log(ar)
        
        setSampleTestInputs(ar)
        
      }}
      value={sampleTestInputs}
      fullWidth={true}
      rows={10}
      multiline={true}
    />
    <StressTest dark={theme?.dark} onGetRandomTests={(ar)=>{
          console.log(ar)
                  setSampleTestInputs(ar)
        }}/>
  </div>)
  let OutputComponent = (
    <div
      style={{
        fontSize: 15,
        overflowY: "scroll",
        overflowX: "hidden",
        height: "calc(100vh - 137px)",
        color: (theme?.dark) ? "white" : null

      }}
    >
      {(output?.map(el=>el)||"")}
    </div>
  )
    let SnippetsComponent = (
      <div style={{ height: "calc(100vh - 137px)" }}>
        <TextField
          variant="outlined"
          style={{
            color: "#E0E0E0",
          }}
          inputProps={{
            style: {
              // marginTop:10,
              color: theme?.dark ? "#D4D4D4" : "#455A64",

              fontSize: 14,
            },

          }}
          InputLabelProps={{
            style: {
              color: (theme?.dark) ? "#D4D4D4" : null

            }
          }}
          onChange={ev => {
            setSearchSnippet(ev.target.value)
          }}
          value={searchSnippet}
          fullWidth={true}
          label="Search for snippets"
        />
        <Snippet search={searchSnippet} />
      </div>
    )

  function getSelectedTab() {
    let component = <div style={{ height: "calc(100vh - 137px)" }}></div>
    switch (selectedTab) {
      case 0:
          component = ProblemComponent
        break;
        case 1:
          component = InputComponent
        break;
        case 2:
          component = OutputComponent
          break;
      case 3:
        component = SnippetsComponent
      default:
        break;
    }
    return component
  }
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        minWidth: "600px",
        backgroundColor: (theme?.dark) ? "#1E1E1E" : "white"
      }}
    >
      <SEO title={`Codeforces ${id}`}></SEO>

      <Layout>
        <div style={{ height: "calc(99vh - 43px)" }}>
          <Split minSize={350} sizes={[0.35, 0.65]}>
            <>
              <Box borderBottom={1} color="gray" marginBottom="10px">
                <AppBar
                  position="sticky"
                  style={{
                    minHeight: 0,
                    height: 41,
                    backgroundColor: "transparent",
                    // bottom: -20,
                  }}
                  elevation={0}
                >
                  <Toolbar variant="dense">
                    <Button
                      variant={selectedTab == 0 ? "outlined" : null}
                      style={{
                        marginLeft: -20,
                        textTransform: "none",
                        fontSize: 13,
                        color: (theme?.dark) ? "#D4D4D4" : null

                      }}
                      onClick={() => {
                        setSelectedTab(0)
                        refreshLatex()
                      }}
                    >
                      <DescriptionIcon
                        style={{
                          height: 15, marginBottom: 2, marginLeft: -10,
                          color: (theme?.dark) ? "#D4D4D4" : null
                        }}
                      />{" "}
                      Problem
                    </Button>
                    <Button
                      variant={selectedTab == 1 ? "outlined" : null}
                      style={{
                        textTransform: "none", fontSize: 13, color: (theme?.dark) ? "#D4D4D4" : null
                      }}
                      onClick={() => {
                        setSelectedTab(1)
                      }}
                    >
                      <KeyboardIcon
                        style={{ height: 15, marginBottom: 2, marginLeft: -10 }}
                      />
                      Input
                    </Button>
                    <Button
                      variant={selectedTab == 2 ? "outlined" : null}
                      style={{
                        textTransform: "none", fontSize: 13, color: (theme?.dark) ? "#D4D4D4" : null
                      }}
                      onClick={() => {
                        setSelectedTab(2)
                      }}
                    >
                      <WebAssetIcon
                        style={{ height: 15, marginBottom: 2, marginLeft: -10 }}
                      />{" "}
                      Output
                    </Button>

                    <Button
                      variant={selectedTab == 3 ? "outlined" : null}
                      style={{
                        textTransform: "none", fontSize: 13, color: (theme?.dark) ? "#D4D4D4" : null
                      }}
                      onClick={() => {
                        setSelectedTab(3)
                      }}
                    >
                      <FlashOnIcon
                        style={{ height: 15, marginBottom: 2, marginLeft: -10 }}
                      />
                      Snippets
                    </Button>
                  </Toolbar>
                </AppBar>
              </Box>
              {getSelectedTab()}
              <SubmissionFooter id={id} />
            </>
            <>
              <AppBar
                position="sticky"
                style={{
                  minHeight: 0,
                  height: 41,
                  backgroundColor: "transparent",
                }}
                elevation={0}
              >

                <Toolbar variant="dense">
                  <Box border={isRoughTab?null:1} borderRadius={isRoughTab?null:10}>

                    <Button style={{
                      textTransform: "none", fontSize: 13, color: (theme?.dark) ? "#D4D4D4" : null
                    }}
                    onClick={()=>{
                      setRoughTab(false)
                    }}
                    >
                      <CodeIcon
                        style={{ height: 15, marginBottom: 2, marginLeft: -10 }}
                      />Code
                    </Button>
                  </Box>
                  <Box border={isRoughTab?1:null} borderRadius={isRoughTab?10:null}>
                    <Button style={{
                      textTransform: "none", fontSize: 13, color: (theme?.dark) ? "#D4D4D4" : null
                    }}
                    onClick={()=>{
                      setRoughTab(true)
                    }}
                    >
                      <AssignmentIcon
                        style={{ height: 15, marginBottom: 2, marginLeft: -10 }}
                        
                        />
                      Rough</Button>
                  </Box>
                </Toolbar>
              </AppBar>


              {getCodeTab()}


              <div
                style={{
                  // minWidth: "600px",
                  width: "100%",
                  height: 40,
                  paddingTop: 2,
                  // backgroundColor: "lightblue",
                }}
              >
                <RunSubmit
                  id={id}
                  getSampleInputsOutputs={getSampleInputsOutputs}
                  setOutputAtParent={setOutputAtParent}
                />
              </div>
            </>
          </Split>
        </div>
      </Layout>
    </div>
  )
}

export default ProblemView
