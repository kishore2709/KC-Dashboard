import {
  drawerWidth,
  transition,
  boxShadow,
  defaultFont,
  primaryColor,
  primaryBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
} from 'assets/jss/material-dashboard-react.jsx';

const sidebarStyle = theme => ({
  drawerPaper: {
    border: 'none',
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    zIndex: '1',
    ...boxShadow,
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'fixed',
      height: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      width: drawerWidth,
      ...boxShadow,
      position: 'fixed',
      display: 'block',
      top: '0',
      height: '100vh',
      right: '0',
      left: 'auto',
      zIndex: '1032',
      visibility: 'visible',
      overflowY: 'visible',
      borderTop: 'none',
      textAlign: 'left',
      paddingRight: '0px',
      paddingLeft: '0',
      transform: `translate3d(${drawerWidth}px, 0, 0)`,
      ...transition,
    },
  },
  logo: {
    position: 'relative',
    zIndex: '4',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '0',

      height: '1px',
      right: '15px',
      width: 'calc(100% - 30px)',
      backgroundColor: 'rgba(180, 180, 180, 0.3)',
    },
  },
  logoLink: {
    ...defaultFont,
    textTransform: 'uppercase',
    padding: '5px 0',
    display: 'block',
    fontSize: '18px',
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: '30px',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    '&,&:hover': {
      color: 'red',
    },
  },
  logoImage: {
    width: '70%',
    display: 'inline-block',
  },
  img: {
    width: '100%',
    position: 'static',
    verticalAlign: 'middle',
    border: '0',
  },
  background: {
    position: 'absolute',
    zIndex: '1',
    height: '100%',
    width: '100%',
    display: 'block',
    top: '0',
    left: '0',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    '&:after': {
      position: 'absolute',
      zIndex: '3',
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      background: 'red',
      opacity: '.8',
    },
  },
  list: {
    marginTop: '20px',
    paddingLeft: '0',
    paddingTop: '0',
    paddingBottom: '0',
    marginBottom: '0',
    listStyle: 'none',
    position: 'unset',
  },
  item: {
    position: 'relative',
    display: 'block',
    textDecoration: 'none',
    color: dangerColor,
    '&:hover,&:focus,&:visited': {
      color: dangerColor,
    },
  },
  itemLink: {
    width: 'auto',
    transition: 'all 300ms linear',
    margin: '5px 5px 0 0',
    borderRadius: '3px',
    position: 'relative',
    padding: '10px 15px',
    backgroundColor: 'transparent',
    '&:hover,&:focus,&:visited': {
      color: dangerColor,
    },
    ...defaultFont,
  },
  itemIcon: {
    width: '20px',
    height: '22px',
    fontSize: '24px',
    lineHeight: '30px',
    float: 'left',
    marginRight: '0px',
    textAlign: 'center',
    verticalAlign: 'middle',
    color: 'rgba(0, 0, 0, 0.8)',
  },
  itemText: {
    ...defaultFont,
    margin: '0',
    lineHeight: '30px',
    fontSize: '14px',
    color: '#000000',
  },
  whiteFont: {
    color: '#000000',
  },
  purple: {
    backgroundColor: primaryColor,
    ...primaryBoxShadow,
    '&:hover': {
      backgroundColor: primaryColor,
      ...primaryBoxShadow,
    },
  },
  blue: {
    backgroundColor: infoColor,
    boxShadow:
      '0 12px 20px -10px rgba(0,188,212,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(0,188,212,.2)',
    '&:hover': {
      backgroundColor: infoColor,
      boxShadow:
        '0 12px 20px -10px rgba(0,188,212,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(0,188,212,.2)',
    },
  },
  green: {
    backgroundColor: successColor,
    boxShadow:
      '0 12px 20px -10px rgba(76,175,80,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(76,175,80,.2)',
    '&:hover': {
      backgroundColor: successColor,
      boxShadow:
        '0 12px 20px -10px rgba(76,175,80,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(76,175,80,.2)',
    },
  },
  orange: {
    backgroundColor: warningColor,
    boxShadow:
      '0 12px 20px -10px rgba(255,152,0,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(255,152,0,.2)',
    '&:hover': {
      backgroundColor: warningColor,
      boxShadow:
        '0 12px 20px -10px rgba(255,152,0,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(255,152,0,.2)',
    },
  },
  red: {
    backgroundColor: dangerColor,
    boxShadow:
      '0 12px 20px -10px rgba(244,67,54,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(244,67,54,.2)',
    '&:hover': {
      backgroundColor: dangerColor,
      boxShadow:
        '0 12px 20px -10px rgba(244,67,54,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(244,67,54,.2)',
    },
  },
  sidebarWrapper: {
    position: 'relative',
    height: 'calc(100vh - 75px)',
    overflow: 'auto',
    width: '260px',
    zIndex: '4',
    overflowScrolling: 'touch',
  },
  activePro: {
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      width: '100%',
      bottom: '13px',
    },
  },
  nested: {
    paddingLeft: theme.spacing.unit * 2,
  },
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
});

export default sidebarStyle;
