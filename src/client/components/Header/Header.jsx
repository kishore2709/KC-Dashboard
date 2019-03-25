import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
// core components

import Button from 'components/CustomButtons/Button.jsx';

import headerStyle from 'assets/jss/material-dashboard-react/components/headerStyle.jsx';
import HeaderLinks from './HeaderLinks.jsx';

function Header({ ...props }) {
  const { classes, color } = props;
  const appBarClasses = classNames({
    [` ${classes[color]}`]: color,
  });

  return (
    <React.Fragment>
      <AppBar className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          <div className={classes.flex} />
          <Hidden smDown implementation="css">
            <HeaderLinks />
          </Hidden>
          <Hidden mdUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={props.handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
};

export default withStyles(headerStyle)(Header);
