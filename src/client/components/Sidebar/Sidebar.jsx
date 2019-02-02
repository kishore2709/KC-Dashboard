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
import { Redirect } from 'react-router-dom';
import HeaderLinks from 'components/Header/HeaderLinks.jsx';
import { GetUserInfo, PostApi } from '_helpers/Utils/index.js';
import Autorenew from '@material-ui/icons/Autorenew';
import Loading from 'components/Loading/Loading.jsx';
import sidebarStyle from 'assets/jss/material-dashboard-react/components/sidebarStyle.jsx';

// / redux
import { connect } from 'react-redux';
import { serverStatusConstants } from '_constants';
import { serverStatusActions } from '_actions';

class Sidebar extends Component {
  constructor(props) {
    super(props);
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
      ],
    };
  }

  componentWillMount() {
    PostApi('/api/users/getUserInfo', GetUserInfo())
      .then(res => {
        // console.log('in then proomse');
        if (res === 'err') {
          // alertErr();
          this.props.error('err');
          console.log('err get user info');
        } else {
          // console.log(res);
          const validKeys = Object.keys(res.permissions).filter(
            val => res.permissions[val].canAccess
          );
          // / console.log(validKeys);
          const curRoutes = this.props.routes;
          console.log(curRoutes);
          const desRoutes = curRoutes.filter(
            val => validKeys.indexOf(val.id) !== -1
          );
          const restSidebar = curRoutes.filter(val => {
            return (
              val.id === 'profile' ||
              val.id === 'redirect' ||
              val.id === 'login'
            );
          });
          this.setState({ routes: [...desRoutes, ...restSidebar] });
          this.props.success('ok');
          console.log(res.permissions);
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
    return this.props.location.pathname.indexOf(routeName) > -1;
  }

  render() {
    const { classes, color, logo, image, logoText } = this.props;
    const { routes } = this.state;
    // console.log(routes);
    const links = (
      <List className={classes.list}>
        {routes.map((prop, key) => {
          if (prop.redirect) return null;

          let listItemClasses;
          listItemClasses = classNames({
            [` ${classes[color]}`]: this.activeRoute(prop.path),
          });

          const whiteFontClasses = classNames({
            [` ${classes.whiteFont}`]: this.activeRoute(prop.path),
          });
          if (prop.path !== '/profile')
            return (
              <NavLink
                to={prop.path}
                className={classes.item}
                activeClassName="active"
                key={key}
              >
                <ListItem button className={classes.itemLink + listItemClasses}>
                  <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
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
        <Hidden mdUp implementation="css">
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
        <Hidden smDown implementation="css">
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
const connectedSidebar = connect(
  null,
  mapDispatchToProps
)(Sidebar);

export default withStyles(sidebarStyle)(connectedSidebar);
