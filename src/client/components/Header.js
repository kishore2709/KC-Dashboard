import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { logo, settingIcon } from "../icon/Icon";
import "./App.css";
import { notification } from "antd";
import { connect } from "react-redux";
class Header extends Component {
  componentDidMount() {
    notification["success"]({
      message: "Chào mừng đến với giao diện quản lý và phân tích Log.",
      description: "Hiện tại dữ liệu được sinh ngẫu nhiên"
    });
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <Nav
          className="navbar navbar-expand-lg bg-light"
          fill
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
              <NavLink
                style={{ color: "black", fontWeight: "bold" }}
                className="nav-item nav-link"
                exact
                to="/"
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                  textDecoration: "underline"
                }}
              >
                Trang chủ{" "}
              </NavLink>
              <NavLink
                style={{ color: "black", fontWeight: "bold" }}
                className="nav-item nav-link"
                to="/user_management"
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                  textDecoration: "underline"
                }}
              >
                Quản lý người dùng
              </NavLink>
              <NavLink
                style={{ color: "black", fontWeight: "bold" }}
                className="nav-item nav-link"
                to="/log_management"
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                  textDecoration: "underline"
                }}
              >
                Quản lý log truy cập
              </NavLink>
              <NavLink
                style={{ color: "black", fontWeight: "bold" }}
                className="nav-item nav-link"
                to="/service_management"
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                  textDecoration: "underline"
                }}
              >
                Quản lý dịch vụ truy cập
              </NavLink>
              <NavLink
                style={{ color: "black", fontWeight: "bold" }}
                className="nav-item nav-link"
                to="/alert_broadcast"
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                  textDecoration: "underline"
                }}
              >
                Quảng bá cảnh báo
              </NavLink>
              <NavLink
                style={{ color: "black", fontWeight: "bold" }}
                className="nav-item nav-link"
                to="/attack_detection"
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                  textDecoration: "underline"
                }}
              >
                Phát hiện tấn công
              </NavLink>
              <NavLink
                style={{ color: "black", fontWeight: "bold" }}
                className="nav-item nav-link"
                to="/search"
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                  textDecoration: "underline"
                }}
              >
                Tìm kiếm thông tin
              </NavLink>
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
            <div className="navbar-nav" style={{ marginRight: "30px" }}>
              <div class="dropleft">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {this.props.user.authentication.user.username}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button class="dropdown-item" type="button">
                  <a class="dropdown-item" href="/login">Logout</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Nav>
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
