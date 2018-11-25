import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { logo, settingIcon } from "../icon/Icon";
import "./App.css";

import { connect } from "react-redux";

const ItemLink = (props) => {
  return (
    
    <NavLink
      style={{ color: "black", fontWeight: "bold" }}
      className="nav-item nav-link"
      exact
      to={props.to}
      activeStyle={{
        fontWeight: "bold",
        color: "red",
        textDecoration: "underline"
      }}
      
    >
      {props.titleName}
    </NavLink>
    
  );
};

class Header extends Component {
  componentDidMount() {
    //notification
  }
  render() {
    console.log(this.props);
    return (
      <div>
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
              <ItemLink to="/" titleName='Trang chủ'/>
              <ItemLink to="/user_management" titleName='Quản lý người dùng'/>
              <ItemLink to="/log_management" titleName='Quản lý log truy cập'/>
              <ItemLink to="/service_management" titleName='Quản lý dịch vụ truy cập'/>
              <ItemLink to="/alert_broadcast" titleName='Quảng bá cảnh báo'/>
              <ItemLink to="/attack_detection" titleName='Phát hiện tấn công'/>
              <ItemLink to="/search" titleName='Tìm kiếm thông tin'/>
              <NavLink
                style={{ color: "black", fontWeight: "bold" }}
                className="nav-item nav-link"
                to="/setting"
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                  textDecoration: "underline"
                }}
              >
                <img
                  className="pull-right"
                  src={settingIcon}
                  width="50"
                  height="25"
                />
              </NavLink>
            </div>
            
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const user = state;
  return {
    user
  };
}

const connectedHeaderPage = connect(mapStateToProps)(Header);
export { connectedHeaderPage };
