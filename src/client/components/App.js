/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import './App.css';
// import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import indexRoutes from 'routes/index.jsx';
// import { connectedHeaderPage as Header } from './Header/Header';
// import Home from './Home/Home';
// import LogManagement from './LogManagement/LogManagement';
// import ServiceManagement from './ServiceManagement/ServiceManagement';
// import DevTable from './AdminManagement/DevTable';
// import AccessManagement from './AccessManagement/AccessManagement';
// import PermanentDrawerLeft from './AdminManagement/ManageUser';
// import Setting from './SettingManagement/Setting';
import ErrorBoundary from 'components/ErrorBoundaries/ErrorBoundaries.jsx';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from './PrivateRoute';
import { LoginPage } from './LoginPage';
// import { RegisterPage } from './RegisterPage';
// import connectedDrawers from './SettingManagement/Drawers';
// noti

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
    return (
      <div>
        <ErrorBoundary>
          <div>
            <div>
              <Router history={history}>
                <Switch>
                  <Route path="/login" component={LoginPage} />
                  {indexRoutes.map((prop, key) => (
                    <PrivateRoute
                      path={prop.path}
                      component={prop.component}
                      key={key}
                    />
                  ))}
                </Switch>
              </Router>
            </div>
          </div>
        </ErrorBoundary>
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
