import {
  drawerWidth,
  transition,
  container,
} from 'assets/jss/material-dashboard-react.jsx';

const appStyle = theme => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
  },
  mainPanel: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
  },
  content: {
    marginTop: '50px',
    padding: '30px 0px',
    minHeight: 'calc(100vh - 123px)',
  },
  container,
  map: {
    marginTop: '5px',
    //marginRight: '5px',
  },
});

export default appStyle;
