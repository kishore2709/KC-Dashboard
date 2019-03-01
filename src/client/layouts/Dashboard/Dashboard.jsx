/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
// import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
// import Header from "components/Header/Header.jsx";
// import Footer from "components/Footer/Footer.jsx";
// import Sidebar from "components/Sidebar/Sidebar.jsx";
// import UserPermission from 'views/UserPermission/UserPermission.jsx';
import { connect } from 'react-redux';
import { dialogActions } from '_actions';
import { withToastManager } from 'react-toast-notifications';

import dashboardRoutes from "routes/dashboard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-3.jpg";
import logo from "assets/img/ais_logo.png";
// import ChangePasswordDialog from "components/Dialogs/ChangePasswordDialog.jsx";
// import { GetUserInfo } from "_helpers/Utils/";
import { PrivateRoute } from '../../components/PrivateRoute';

// loader
import Loadable from 'react-loadable';
import TableLoader from 'components/ContentLoader/TableLoader.jsx';
import { aimlActions } from '_actions';
import { store } from '_helpers';
// noti
import Notifications from 'react-notification-system-redux';

const Sidebar = Loadable.Map({
  loader: {
    SidebarComponent: () =>
      import(/* webpackChunkName: "Sidebar", webpackPrefetch: true */ 'components/Sidebar/Sidebar.jsx'),
    arrayItems: () =>
      new Promise(resolve => {
        resolve(store.dispatch(aimlActions.getListChatbot()));
      }),
  },
  loading: TableLoader,
  render(loaded, props) {
    const Sidebar = loaded.SidebarComponent.default;
    return <Sidebar {...props} />;
  },
});

const homeRoute = (
  <Switch>
    {dashboardRoutes.filter(val => val.path === '/home').map((prop, key) => {
      return <Route path={prop.path} component={prop.component} key={prop.id} />;
    })}
  </Switch>
)
const switchRoutes = (
  <Switch>
    {dashboardRoutes.filter(val => ('subPaths' in val)).map(val => {
      val.subPaths.map((prop, key) => {
        // console.log('???');
        // console.log(prop);
        return <Route path={prop.path} component={prop.component} key={prop.id} />;
      })
    }).concat(
      dashboardRoutes.map((prop, key) => {
        if (prop.redirect)
          return <Redirect from={prop.path} to={prop.to} key={prop.id} />;
        return <Route path={prop.path} component={prop.component} key={prop.id} />;
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
    return this.props.location.pathname !== "/discover";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    // if (navigator.platform.indexOf("Win") > -1) {
    //   const ps = new PerfectScrollbar(this.refs.mainPanel);
    // }
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
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const style = {
      NotificationItem: { // Override the notification item
        DefaultStyle: { // Applied to every notification, regardless of the notification level
          margin: '10px 5px 2px 1px'
        },
        success: { // Applied only to the success notification item
          color: 'red',
          backgroundColor: 'black',
        }
      }
    };
    const { classes, openDialogPwdForm, notifications, ...rest } = this.props;
    // case path ===/home -> show home page
    const HomeLayout = ({ component: Component, ...rest }) => {
      return (
        <Route {...rest} render={matchProps => (
          <div className={classes.wrapper}>
            <Component {...matchProps} />
          </div>
        )} />
      )
    }
    const DashboardLayout = ({ component: Component, ...rest }) => {
      return (
        <Route {...rest} render={matchProps => (
          <div className={classes.wrapper}>
            <Notifications
              notifications={notifications}
              style={style}
            />
            <Sidebar
              routes={dashboardRoutes}
              logoText={"AIS Dashboard"}
              logo={logo}
              image={image}
              handleDrawerToggle={this.handleDrawerToggle}
              open={this.state.mobileOpen}
              color="red"
              {...rest}
            />
            <div className={classes.mainPanel} ref="mainPanel">
              <div className={classes.content}>
                <div className={classes.container}><Component {...matchProps} /></div>
              </div>
            </div>
          </div>
        )} />
      )
    }
    return <Switch>
      {
        dashboardRoutes.filter(val => !(val.path === '/home')).map((prop, key) => {
          if (prop.redirect)
            return <Redirect from={prop.path} to={prop.to} key={prop.id} />;
          return (
            <DashboardLayout path={prop.path} component={prop.component} key={prop.id} />
          )
        })
      }
    </Switch>
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  openDialogPwdForm: newStatus => {
    dispatch(dialogActions.openDialogPwdForm(newStatus));
  },
});

export default withStyles(dashboardStyle)(
  connect(
    state => ({ notifications: state.notifications, }),
    mapDispatchToProps
  )(withToastManager(App))
);
