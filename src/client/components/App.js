/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import './App.css';
// import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { connectedHeaderPage as Header } from './Header';
import Home from './Home/Home';
import LogManagement from './LogManagement/LogManagement';
import ServiceManagement from './ServiceManagement/ServiceManagement';
import PermanentDrawerLeft from './AdminManagement/ManageUser';
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
    const showHeader = history => {
      if (
        history.location.pathname === '/login' ||
        history.location.pathname === '/register'
      )
        return <div />;
      return <Header />;
    };
    return (
      <div>
        <div>
          <div>
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            <Router history={history}>
              <div>
                {showHeader(history)}
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
                    component={PermanentDrawerLeft}
                  />
                  <PrivateRoute
                    exact
                    path="/service_management"
                    component={ServiceManagement}
                  />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />
                </Switch>
              </div>
            </Router>
          </div>
        </div>
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
