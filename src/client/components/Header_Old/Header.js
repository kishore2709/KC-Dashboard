/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import PropTypes from 'prop-types';
import { withToastManager, ToastProvider } from 'react-toast-notifications';
import ConnectedDrawers from '../SettingManagement/Drawers';
import { drawerActions } from '../../_actions/drawer.actions';
import { logo, settingIcon } from '../icon/Icon';
import { history } from '../../_helpers';
import AdminHeader from '../AdminManagement/AdminHeaderPage';
// import { map } from 'rsvp';

const ItemLink = ({ to, titleName }) => (
  <NavLink
    style={{ color: 'black', fontWeight: 'bold' }}
    className="nav-item nav-link"
    exact
    to={to}
    activeStyle={{
      fontWeight: 'bold',
      color: 'red',
      textDecoration: 'underline',
    }}
  >
    {titleName}
  </NavLink>
);

ItemLink.propTypes = {
  to: PropTypes.string.isRequired,
  titleName: PropTypes.string.isRequired,
};

class Header extends Component {
  componentDidMount() {
    // notification
  }

  render() {
    const { opened, children } = this.props;
    console.log(this.props);
    if (
      history.location.pathname === '/login' ||
      history.location.pathname === '/register'
    )
      return <div>{children}</div>;
    if (history.location.pathname.includes('manageUser'))
      return (
        <ToastProvider placement="bottom-right">
          <AdminHeader>{children}</AdminHeader>
        </ToastProvider>
      );
    return (
      <div>
        <ToastProvider placement="bottom-right">
          <ConnectedDrawers />
          <nav
            className="navbar navbar-expand-lg bg-light"
            fill="true"
            variant="tabs"
          >
            <a className="navbar-brand" href="/">
              <img
                src={logo}
                width="70"
                height="50"
                style={{ margin: 0 }}
                alt=""
              />
            </a>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <ul className="navbar-nav mr-auto">
                <ItemLink to="/" titleName="Trang chủ" />
                {
                  // <ItemLink to="/user_management" titleName="Quản lý người dùng" />
                }
                <ItemLink
                  to="/log_management"
                  titleName="Quản lý log truy cập"
                />
                <ItemLink
                  to="/service_management"
                  titleName="Quản lý dịch vụ truy cập"
                />
                <ItemLink to="/alert_broadcast" titleName="Quảng bá cảnh báo" />
                <ItemLink
                  to="/attack_detection"
                  titleName="Phát hiện tấn công"
                />
                <ItemLink to="/search" titleName="Tìm kiếm thông tin" />
              </ul>
              <img
                alt=""
                className="pull-right"
                src={settingIcon}
                width="50"
                height="25"
                onClick={() => {
                  // console.log(this.props.dispatch);
                  opened(true);
                }}
              />
            </div>
          </nav>
          {children}
        </ToastProvider>
      </div>
    );
  }
}

Header.propTypes = {
  opened: PropTypes.func.isRequired,
};
function mapStateToProps(state) {
  const user = state;
  return {
    user,
  };
}

const mapDispatchToProps = dispatch => ({
  opened: newStatus => {
    dispatch(drawerActions.opened(newStatus));
  },
  closed: newStatus => {
    dispatch(drawerActions.closed(newStatus));
  },
});
const connectedHeaderPage = withToastManager(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
export { connectedHeaderPage };
