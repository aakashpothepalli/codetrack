import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
},
exampleWrapper: {
    // position: 'absolute',
    // marginTop: theme.spacing(3),
    // height: '15vh',
    // width:'90vw'
    // height:'100vh',
    // width:'100vw',
    // left:-20,
    // top:'-80vh'
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    // position: 'absolute',
    // '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    //   bottom: theme.spacing(2),
    //   right: theme.spacing(2),
    // },
    // '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    //   top: theme.spacing(2),
    //   left: theme.spacing(2),
    // },
  },
}));

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <FavoriteIcon />, name: 'Like' },
];

export default function SubmissionsFAB() {
  const classes = useStyles();
  const [direction, setDirection] = React.useState('down');
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };

  const handleHiddenChange = (event) => {
    setHidden(event.target.checked);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.exampleWrapper}>
      
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          hidden={hidden}
          icon={<p style={{marginTop:25}}>Submissions</p>}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={'left'}
          FabProps ={{variant:'extended',size:'small'}}
          
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleClose}
            />
          ))}
        </SpeedDial>
    </div>
  );
}
