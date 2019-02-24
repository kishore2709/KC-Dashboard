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
import { alertActions,mailActions } from '../_actions';
import { PrivateRoute } from './PrivateRoute';
import { LoginPage } from './LoginPage';
import { PostApi } from '../_helpers/Utils/PostApi'
// import { RegisterPage } from './RegisterPage';
// import connectedDrawers from './SettingManagement/Drawers';
var DATA = [
  {
    seen: false,
    content: 'Mã độc Bashlite đang tấn công vào hệ thống của bạn',
    sender: 'Admin',
    time: '2019-24-02',
    location:'Hà Nội'
  },
  {
    seen: true,
    content: 'Mã độc Mirai đang tấn công vào hệ thống của bạn',
    sender: 'Admin',
    time: '2019-24-02',
    location:'Đà Nẵng'
  }
]
class App extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    history.listen((_location, _action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }
  async componentDidMount(){
    const { dispatch } = this.props;
    setTimeout(()=> {  
      alert('Mã độc Bashlite đang tấn công vào hệ thống'); 
      dispatch(mailActions.fixMail(DATA));
    }, 2000);
    // PostApi('/api/users/sendEmails',{
    //   toEmails: 'huanthemenk55@gmail.com',
    //   subject:'Cảnh báo',
    //   content:'Mã độc Bashlite đang tấn công vào hệ thống của bạn',
    //   html:`<h2>Cảnh báo</h2><p>Mã độc Bashlite đang tấn công vào hệ thống của bạn</p><br/>`,
    // })
  }
  render() {
    // const { alert } = this.props;

    return (
      <div>
        <ErrorBoundary>
          <ToastProvider placement='bottom-right'>
            <div>
              <div>
                <Router history={history}>
                  <Switch>
                    <Route path="/login" component={LoginPage} />
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
        </ErrorBoundary>
      </div >
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  alert: PropTypes.object.isRequired,
  mailBox:PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  const { alert,mailBox } = state;
  return {
    alert,mailBox
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
