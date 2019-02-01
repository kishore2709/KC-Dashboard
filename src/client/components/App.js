/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import './App.css';
// import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import indexRoutes from 'routes/index.jsx';
import { ToastProvider } from 'react-toast-notifications';
// import { connectedHeaderPage as Header } from './Header/Header';
// import Home from './Home/Home';
// import LogManagement from './LogManagement/LogManagement';
// import ServiceManagement from './ServiceManagement/ServiceManagement';
// import DevTable from './AdminManagement/DevTable';
// import AccessManagement from './AccessManagement/AccessManagement';
// import PermanentDrawerLeft from './AdminManagement/ManageUser';
// import Setting from './SettingManagement/Setting';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from './PrivateRoute';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
// import connectedDrawers from './SettingManagement/Drawers';

class App extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    history.listen((_location, _action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;

    return (
      <div>
        <ToastProvider placement="top-center" placementOffset={[500, 500]}>
          <div>
            <div>
              {alert.message && (
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              )}
              <Router history={history}>
                <Switch>
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />
                  {indexRoutes.map((prop, key) => {
                    console.log(prop);
                    return (
                      <PrivateRoute
                        path={prop.path}
                        component={prop.component}
                        key={key}
                      />
                    );
                  })}
                </Switch>
                {/*
              <div>
                <Header>
                  <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute
                      exact
                      path="/log_management"
                      component={LogManagement}
                    />
                    <PrivateRoute
                      exact
                      path="/manageUser"
                      component={DevTable}
                    />
                    <PrivateRoute
                      exact
                      path="/manageUser/accessManagement"
                      component={AccessManagement}
                    />
                    <PrivateRoute
                      exact
                      path="/service_management"
                      component={ServiceManagement}
                    />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                  </Switch>
                </Header>
              </div>
              */}
              </Router>
            </div>
          </div>
        </ToastProvider>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  alert: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert,
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
