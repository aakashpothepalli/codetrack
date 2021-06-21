import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField,ListItemIcon,Select,MenuItem,Input} from "@material-ui/core"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from "axios"
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StressTest({onGetRandomTests}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hasTestCases,setHasTestCases]  = React.useState(false)
  const [seed, setSeed] = useState(new Date().getTime())
  const [type, setType] = useState("1darray")
  
  const [myConfig,setMyConfig] = useState({
    rangeNR:100,
    rangeNL:0,
    n:10
  })
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useState(()=>{
      console.log(myConfig)
  },[myConfig])

  const oneDArrayComponent = (
    <div >
        <div style={{display:"flex",flexDirection:"row"}}>
            <div style={{marginRight:10}}>n:</div>
            <TextField
                // type="number"
                value = {myConfig.n||0}
                onChange= {(e)=>{
                    let val = e.target.value
                    setMyConfig({...myConfig,n:Number(val==""?0:val)})
                }}
            />
            <div style={{marginLeft:10,marginRight:10}}>, value range : </div>
            <TextField
                // type="number"
                id="nrangeto" 
                onChange= {(e)=>{
                  let val = e.target.value
                  setMyConfig({...myConfig,rangeNL:Number(val==""?0:val)})
                }}
                value = {myConfig.rangeNL}
            />
            <div style={{marginLeft:10,marginRight:10}}> to  </div>
            <TextField
                // type="number"
                onChange= {(e)=>{
                  let val  = e.target.value
                  setMyConfig({...myConfig,rangeNR:Number(val==""?0:val)})
                }}
                value = {myConfig.rangeNR}
            />
        </div>
    </div>
  )
  async function runStressTest(){
    setOpen(false)
      let obj = {
        myConfig,
        type,
        seed,
        hasTestCases
      }
      console.log(obj)
       axios.post('/api/stressTest',obj).then(res=>{
        console.log(res.data);
        onGetRandomTests(res.data)
      }).catch(err=>{
        console.log(err)
      })
  } 
  return (
    <div onKeyDown={e => {
      if (e.keyCode === 13) {
        runStressTest()
      }
    }}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Stress Test
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Stress Test
            </Typography>
            <Button autoFocus color="inherit" onClick={runStressTest}>
              Run
            </Button>
          </Toolbar>
        </AppBar>

        <List>
          <ListItem button onClick={(e)=>setHasTestCases(!hasTestCases)}>
          <ListItemIcon>
              <Checkbox
                edge="start"
                checked={hasTestCases}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText  primary= "Has multiple test cases" />

          </ListItem>

          <Divider />
          
          <ListItem >
            <ListItemText primary="Seed" />
            <TextField
                variant="outlined"
                onChange={ev => {
                    setSeed(ev.target.value)
                }}
                value={seed}
                />
          </ListItem>
          <Divider />

          <ListItem >
            <ListItemText primary="Type" />
            <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={type}
                onChange={(e)=>{setType(e.target.value)}}
            >
            <MenuItem value={"1darray"}>1D Array</MenuItem>
            <MenuItem value={"2darray"}>2D Array</MenuItem>
            <MenuItem value={"graph"}>Graph</MenuItem>
            <MenuItem value={"dynamic"}>Dynamic</MenuItem>
            </Select>
          </ListItem>

          <Divider />

          <ListItem>
              {oneDArrayComponent}
          </ListItem>

        <Divider />

        </List>
      </Dialog>
    </div>
  );
}
