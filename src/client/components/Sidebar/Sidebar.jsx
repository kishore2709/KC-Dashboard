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
import Loading from 'components/Loading/Loading.jsx';
import sidebarStyle from 'assets/jss/material-dashboard-react/components/sidebarStyle.jsx';
//
// / redux
import { connect } from 'react-redux';
import { serverStatusConstants } from '_constants';
import { serverStatusActions } from '_actions';
import DropDown from './DropDown';
// /

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.activeRoute = this.activeRoute.bind(this);
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1;
  }

  render() {
    const { classes, color, logo, image, logoText, routes } = this.props;
    const links = (
      <List className={`${classes.list} ${classes.root}`}>
        {routes.map((prop, key) => {
          if (prop.redirect) return null;

          const listItemClasses = classNames({
            [` ${classes[color]}`]: this.activeRoute(prop.path),
          });

          const whiteFontClasses = classNames({
            [` ${classes.whiteFont}`]: this.activeRoute(prop.path),
          });
          if (prop.path !== '/dashboard')
            if ('subPaths' in prop) {
              return <DropDown {...prop} color key={key} />;
              // return NavUserManagement(prop, key);
            } else
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
                  </ListItem>
                </NavLink>
              );
        })}
      </List>
    );
    const brand = (
      <div className={classes.logo}>
        <NavLink to="/dashboard" className={classes.logoLink}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
        </NavLink>
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
const connectedSidebar = connect(
  null,
  mapDispatchToProps
)(Sidebar);

export default withStyles(sidebarStyle)(connectedSidebar);
