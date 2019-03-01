import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import { hot } from 'react-hot-loader';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AISLogo from 'assets/img/ais_logo.png';
import BackgroundImg from 'assets/img/background_img.png';

const styles = theme => ({
  navlink: {
    color: 'inherit',
    height: '100%',
    fontSize: '100%',
    width: 'auto',
    textAlign: 'center',
    marginRight: '35px',
    display: 'inline-flex',
    margin: 'auto',
    '&:hover': {
      color: 'red',
    },
    // position: 'relative',
  },
  navButton: {
    color: 'inherit',
    height: '100%',
    fontSize: '100%',
    width: 'auto',
    textAlign: 'center',
    marginRight: '15px',
    display: 'inline-flex',
    margin: 'auto',
    '&:hover': {
      color: 'red',
    },
    padding: '2px 10px',
    border: '1px solid white',
    borderRadius: '5px',
  },
  colorBar: {
    background: '#7C4DFF',
  },
  root: {
    // backgroundColor: '#7C4DFF',
    position: 'fixed',
    width: '100%',
    zIndex: 30,
    height: '60px',
    background: '#7C4DFF',
    display: 'block',
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '30px',
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  content: {
    background: '#7C4DFF',
    width: '100%',
    height: 'calc(100vh - 60px)', // header:60, footer: 150px,
    minHeight: '350px',
    color: 'white',
  },
  bgImg: {
    height: '80vh',
    width: '80vh',
  },
  flexBox: {
    height:'100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexContent: {
    margin: '15px 2px',
    padding: '15px 15px',
  },
});

class Home extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl, value } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    const Content = (
      <Grid container style={{ height: '100%' }}>
        <Grid item xs={12} md={7}>
          <div className={classes.flexBox}>
            <Typography
              className={classes.flexContent}
              variant="h2"
              align="center"
              color="inherit"
            >
              Chatbot for <span style={{ fontWeight: 'bold' }}>Marketing</span>
            </Typography>
            <Typography
              className={classes.flexContent}
              variant="h6"
              align="center"
              color="inherit"
            >
              Build intelligent conversational agents on the leading platform
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={5} className={classes.flexBox}>
          <img
            className={classes.flexContent}
            alt="background image"
            src={BackgroundImg}
            className={classes.bgImg}
          />
        </Grid>
      </Grid>
    );
    return (
      <div className={classes.root}>
        <AppBar
          position="position"
          classes={{
            colorPrimary: classes.colorBar,
          }}
        >
          <Toolbar>
            <Typography
              className={classes.title}
              variant="h5"
              color="inherit"
              noWrap
            >
              AIS Chatbot
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <NavLink to="#" className={classes.navlink}>
                <Typography variant="subtitle1" color="inherit" noWrap>
                  Về chúng tôi
                </Typography>
              </NavLink>
              <NavLink to="#" className={classes.navlink}>
                <Typography variant="subtitle1" color="inherit" noWrap>
                  Hướng dẫn
                </Typography>
              </NavLink>
              <NavLink to="#" className={classes.navlink}>
                <Typography variant="subtitle1" color="inherit" noWrap>
                  Các dịch vụ
                </Typography>
              </NavLink>
              <NavLink to="#" className={classes.navButton}>
                <Typography variant="subtitle1" color="inherit" noWrap>
                  Đăng nhập
                </Typography>
              </NavLink>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        <div className={classes.content}>{Content}</div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
