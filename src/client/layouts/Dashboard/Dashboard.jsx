/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";

import Loadable from 'react-loadable';
import ListLoader from 'components/ContentLoader/ListLoader.jsx';
import Sidebar from "components/Sidebar/Sidebar.jsx";
// import UserPermission from 'views/UserPermission/UserPermission.jsx';
import { withToastManager } from 'react-toast-notifications';

import dashboardRoutes from "routes/dashboard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import ChangePasswordDialog from 'components/Dialogs/ChangePasswordDialog.jsx';

import image from "assets/img/sidebar-3.jpg";
import logo from "assets/img/ptit-logo.png";
const switchRoutes = (
  <Switch>
    {(dashboardRoutes.filter(val => ('subNavBar' in val))[0].subNavBar.map((prop, key) => {
      // console.log('???');
      // console.log(prop);
      return <Route path={prop.path} component={props => <prop.component/> } key={prop.id} />;
    })).concat(
      dashboardRoutes.map((prop, key) => {
        if (prop.redirect)
          return <Redirect from={prop.path} to={prop.to} key={prop.id} />;
        return <Route path={prop.path} component={props => <prop.component/> } key={prop.id} />;
      })
    )}

  </Switch>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "//";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    console.log('Dashboard mount');
    if (navigator.platform.indexOf("Win") > -1) {
      // const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      // this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    console.log('Dashboard Unmount');
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"PTIT Dashboard"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="red"
          {...rest}
        />
        <div className={classes.mainPanel}>
          <ChangePasswordDialog />
          <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
              <div className={classes.map}>
              <div className={classes.container}>{switchRoutes}</div>
              </div>
            )}
          {/* {this.getRoute() ? <Footer /> : null} */}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};



export default withStyles(dashboardStyle)(
 
  withToastManager(App)
);
