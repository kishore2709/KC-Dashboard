import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
// core components
// import UserProfile from 'views/UserProfile/UserProfile.jsx';
// import PowerIcon from '@material-ui/icons/PowerOff';
// import { Redirect } from 'react-router-dom';
import HeaderLinks from 'components/Header/HeaderLinks.jsx';
import { GetUserInfo, PostApi } from '_helpers/Utils/index.js';
import Autorenew from '@material-ui/icons/Autorenew';
import Loading from 'components/Loading/Loading.jsx';
import NumberMail from 'components/NumberMail/NumberMail.jsx';

import sidebarStyle from 'assets/jss/material-dashboard-react/components/sidebarStyle.jsx';
//icon
import PowerIcon from '@material-ui/icons/PowerOff';

import Collapse from '@material-ui/core/Collapse';
// import InboxIcon from '@material-ui/icons/Inbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
// / redux
import { connect } from 'react-redux';
// import { serverStatusConstants } from '_constants';
import { serverStatusActions } from '_actions';
import { Redirect } from 'react-router-dom';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    // console.log('in constructor sidebar');
    // console.log(['/userGroup','/permission','/manageUser'].includes(window.location.pathname), window.location.pathname);
    this.activeRoute = this.activeRoute.bind(this);
    this.state = {
      routes: [
        {
          id: 'loading',
          path: '/loading',
          sidebarName: '.. loading',
          navbarName: 'Tải dữ liệu về máy chủ',
          icon: Autorenew,
          component: Loading,
        },
        {
          id: 'login',
          path: '/login',
          sidebarName: 'Đăng xuất',
          icon: PowerIcon,
          component: <Redirect to="/login" />,
        },
      ],
      openUserManagementSubComponents: ['/userGroup', '/permission', '/manageUser'].includes(window.location.pathname),
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    // console.log('will mount ?');
    PostApi('/api/users/getUserInfo', GetUserInfo())
      .then(res => {
        // console.log('in then proomse');
        if (!res || res === 'err') {
          // alertErr();
          this.props.error('err');
          console.log('err');
          console.log('err get user info');
        } else {
          // console.log(res);
          if (!res || !('permissions' in res)) throw new Error('permission not found in respones');
          console.log(res.permissions);
          const validKeys = Object.keys(res.permissions).filter(
            val => res.permissions[val].canAccess
          );
          // / console.log(validKeys);
          const curRoutes = this.props.routes;
          console.log(curRoutes);
          console.log(validKeys);
          const desRoutes = curRoutes.filter(
            val => validKeys.indexOf(val.id) !== -1
          );
          const restSidebar = curRoutes.filter(
            val =>
              val.id === 'profile' ||
              val.id === 'redirect' ||
              val.id === 'login'
          );
          this.setState({ routes: [...desRoutes, ...restSidebar] });
          this.props.success('ok');
          // console.log(res.permissions);
          // console.log(desRoutes);
        }
      })
      .catch(err => {
        // ret = 'err';
        this.props.error('err');
        console.log('get user data from database err');
        console.log(err);
        // alertErr();
      });
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    // return true;
    return this.props.location.pathname.indexOf(routeName) > -1;
  }
  numberNotSeen(arr) {
    let res = 0;
    for (let i = 0; i < arr.length; i++)
      if (!arr[i].seen) res++;
    return res;
  }
  handleClick() {
    this.setState(state => ({
      openUserManagementSubComponents: !state.openUserManagementSubComponents,
    }));
  }

  render() {

    const { classes, color, logo, image, logoText, mailBox } = this.props;
    let flagMail = false;
    if (mailBox.dataMail != undefined) {
      if (this.numberNotSeen(mailBox.dataMail) > 0) flagMail = true;
    }
    const { routes, openUserManagementSubComponents } = this.state;
    console.log('??');
    console.log(routes);
    const listItemClasses = path =>
      classNames({
        [` ${classes[color]}`]: this.activeRoute(path),
      });

    const whiteFontClasses = path =>
      classNames({
        [` ${classes.whiteFont}`]: this.activeRoute(path),
      });

    const NavUserManagement = (prop, key) => (
      <React.Fragment key={key}>
        <ListItem
          button
          onClick={this.handleClick}
          className={classes.itemLink + listItemClasses(prop.path)}
        >
          <ListItemIcon
            className={classes.itemIcon + whiteFontClasses(prop.path)}
          >
            <prop.icon />
          </ListItemIcon>
          <ListItemText
            primary={prop.sidebarName}
            className={classes.itemText + whiteFontClasses(prop.path)}
            disableTypography
          />
          {this.state.openUserManagementSubComponents ? (
            <ExpandLess />
          ) : (
              <ExpandMore />
            )}
        </ListItem>
        <Collapse
          in={openUserManagementSubComponents}
          timeout="auto"
          unmountOnExit
        >
          <List disablePadding className={classes.nested}>
            {prop.subNavBar.map(val => (
              <NavLink
                to={val.path}
                className={classes.item}
                activeClassName="active"
                key={val.id}
              >
                <ListItem
                  key={val.id}
                  button
                  className={classes.itemLink + listItemClasses(val.path)}
                >
                  <ListItemIcon
                    className={classes.itemIcon + whiteFontClasses(val.path)}
                  >
                    <val.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={val.sidebarName}
                    className={classes.itemText + whiteFontClasses(val.path)}
                    disableTypography
                  />
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
    const links = (
      <List className={`${classes.list} ${classes.root}`}>
        {routes.map((prop, key) => {
          if (prop.redirect) return null;

          let listItemClasses;
          listItemClasses = classNames({
            [` ${classes[color]}`]: this.activeRoute(prop.path),
          });

          const whiteFontClasses = classNames({
            [` ${classes.whiteFont}`]: this.activeRoute(prop.path),
          });
          // console.log(prop.path);
          if (prop.path !== '/profile')
            if (prop.path == '/user') return NavUserManagement(prop, key);
            else
              return (
                <NavLink
                  to={prop.path}
                  className={classes.item}
                  activeClassName="active"
                  key={key}
                >
                  <ListItem
                    button
                    className={classes.itemLink + listItemClasses}
                  >
                    <ListItemIcon
                      className={classes.itemIcon + whiteFontClasses}
                    >
                      {typeof prop.icon === 'string' ? (
                        <Icon>{prop.icon}</Icon>
                      ) : (
                          <prop.icon />
                        )}
                    </ListItemIcon>
                    <ListItemText
                      primary={prop.sidebarName}
                      className={classes.itemText + whiteFontClasses}
                      disableTypography
                    />
                    {
                      (flagMail
                        && prop.path == '/mailBox'
                      ) &&
                      <NumberMail
                        title={this.numberNotSeen(this.props.mailBox.dataMail)}
                      />
                    }
                  </ListItem>
                </NavLink>
              );
        })}
      </List>
    );
    const brand = (
      <div className={classes.logo}>
        <a href="#" className={classes.logoLink}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
        </a>
      </div>
    );
    return (
      <div>
        <Hidden mdUp implementation="css" key="hidden1">
          <Drawer
            variant="temporary"
            anchor="right"
            open={this.props.open}
            classes={{
              paper: classes.drawerPaper,
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>
              <HeaderLinks />
              {links}
            </div>
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css" key="hidden2">
          <Drawer
            anchor="left"
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>{links}</div>
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => ({
  success: newStatus => {
    dispatch(serverStatusActions.success(newStatus));
  },
  error: newStatus => {
    dispatch(serverStatusActions.error(newStatus));
  },
  loading: newStatus => {
    dispatch(serverStatusActions.loading(newStatus));
  },
});
function mapStateToProps(state) {
  const { mailBox } = state;
  return {
    mailBox
  };
}
const connectedSidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);

export default withStyles(sidebarStyle)(connectedSidebar);
