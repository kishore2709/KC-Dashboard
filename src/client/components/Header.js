/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import PropTypes from 'prop-types';
import ConnectedDrawers from './SettingManagement/Drawers';
import { drawerActions } from '../_actions/drawer.actions';
import { logo, settingIcon } from './icon/Icon';
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
    const { opened } = this.props;
    console.log(this.props);
    return (
      <div>
        <ConnectedDrawers />
        <nav
          className="navbar navbar-expand-lg bg-light"
          fill="true"
          variant="tabs"
          defaultActiveKey="/"
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
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mr-auto">
              <ItemLink to="/" titleName="Trang chủ" />
              <ItemLink to="/user_management" titleName="Quản lý người dùng" />
              <ItemLink to="/log_management" titleName="Quản lý log truy cập" />
              <ItemLink
                to="/service_management"
                titleName="Quản lý dịch vụ truy cập"
              />
              <ItemLink to="/alert_broadcast" titleName="Quảng bá cảnh báo" />
              <ItemLink to="/attack_detection" titleName="Phát hiện tấn công" />
              <ItemLink to="/search" titleName="Tìm kiếm thông tin" />

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
          </div>
        </nav>
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
const connectedHeaderPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
export { connectedHeaderPage };
