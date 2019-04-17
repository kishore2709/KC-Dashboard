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
import ErrorBoundary from 'components/ErrorBoundaries/ErrorBoundaries.jsx';
import { history } from '../_helpers';
import { alertActions, mailActions } from '../_actions';
import { PrivateRoute } from './PrivateRoute';
import { LoginPage } from './LoginPage';
import { PostApi } from '../_helpers/Utils/PostApi';
// import { dateRange } from '../_reducers/dateRange.reducer';
// import { RegisterPage } from './RegisterPage';
// import connectedDrawers from './SettingManagement/Drawers';
if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}
class App extends React.Component {
  constructor(props) {
    super(props);
    // const { dispatch } = this.props;
    // history.listen((_location, _action) => {
    //   // clear alert on location change
    //   dispatch(alertActions.clear());
    // });
  }

  componentDidMount() {
    console.log('App did mount ??');
    // const { dispatch } = this.props;
    const arr = [];
    const date = new Date();
    const month =
      date.getMonth() + 1 < 10
        ? `0${(date.getMonth() + 1).toString()}`
        : (date.getMonth() + 1).toString();
    const day =
      date.getDate() < 10
        ? `0${date.getDate().toString()}`
        : date.getDate().toString();
    // arr.push({
    //   seen: false,
    //   content: 'Mã độc Bashlite đang tấn công vào hệ thống của bạn',
    //   sender: 'Admin',
    //   time: `2019-${month}-${day}`,
    //   location: 'Hà Nội',
    // });
    // setTimeout(() => {
    //   alert('Mã độc Bashlite đang tấn công vào hệ thống');
    //   dispatch(mailActions.fixMail(arr));
    // }, 5000);

    // PostApi('/api/users/sendSMS', {
    //   toSMS: '0985061316',
    //   // content:'Mã độc Bashlite đang tấn công vào hệ thống của bạn',
    //   content: 'Ma doc Bashlite dang tan cong vao he thong cua ban',
    // });

    //
    // PostApi('/api/users/sendEmails', {
    //   toEmails: 'mikelhpdatke@gmail.com',
    //   subject: 'Cảnh báo',
    //   content: 'Mã độc Bashlite đang tấn công vào hệ thống của bạn',
    //   html: `<h2>Cảnh báo</h2><p>Mã độc Bashlite đang tấn công vào hệ thống của bạn</p><br/>`,
    // });
  }

  render() {
    // const { alert } = this.props;

    return (
      <div>
        <ErrorBoundary>
          <ToastProvider placement="bottom-right">
            <div>
              <div>
                <Router history={history}>
                  <Switch>
                    <Route path="/login" component={LoginPage} />
                    {indexRoutes.map((prop, key) => (
                      // console.log(prop);
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
          </ToastProvider>
        </ErrorBoundary>
      </div>
    );
  }
}

App.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  // alert: PropTypes.object.isRequired,
  // mailBox: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  const { alert, mailBox } = state;
  return {
    alert,
    mailBox,
  };
}

// const connectedApp = connect()(App);
export { App };
