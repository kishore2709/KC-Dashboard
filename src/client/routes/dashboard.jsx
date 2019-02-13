// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
// import LocationOn from '@material-ui/icons/LocationOn';
import Notifications from '@material-ui/icons/Notifications';
// import Unarchive from '@material-ui/icons/Unarchive';
// core components/views
import DashboardPage from 'views/Dashboard/Dashboard.jsx';
import UserManagement from 'views/UserManagement/UserManagement.jsx';
import LogManagement from 'views/LogManagement/LogManagement.jsx';
import ServiceManager from 'views/ServiceManager/ServiceManager.jsx';
import AttackReport from 'views/AttackReport/AttackReport.jsx';
import Icons from 'views/Icons/Icons.jsx';
// import Maps from 'views/Maps/Maps.jsx';
import NotificationsPage from 'views/Notifications/Notifications.jsx';
import AccessIcon from '@material-ui/icons/AccessibilityNew';
import { Redirect } from 'react-router-dom';
import UserPermission from 'views/UserPermission/UserPermission.jsx';
import GroupPermission from 'views/GroupPermission/GroupPermission.jsx';
import React from 'react';
// import { GetUserInfo, PostApi } from '_helpers/Utils/index.js';
import UserProfile from 'views/UserProfile/UserProfile.jsx';
import PowerIcon from '@material-ui/icons/PowerOff';
import Discover from 'views/Discover/Discover.jsx';

const dashboardRoutes = [
  {
    id: 'dashboard',
    path: '/dashboard',
    sidebarName: 'Trang chủ',
    navbarName: 'Giao diện Dashboard',
    icon: Dashboard,
    component: DashboardPage,
  },
  {
    id: 'user',
    path: '/user',
    sidebarName: 'Quản lý người dùng',
    navbarName: 'Giao diện quản lý người dùng',
    icon: Person,
    component: UserManagement,
    subNavBar: [
      {
        id: 'user',
        path: '/userGroup',
        sidebarName: 'Nhóm người dùng',
        navbarName: 'Giao diện quản lý nhóm người dùng',
        icon: Person,
        component: GroupPermission,
      },
      {
        id: 'permission',
        path: '/permission',
        sidebarName: 'Phân quyền người dùng',
        navbarName: 'Giao diện phân quyền người dùng',
        icon: AccessIcon,
        component: UserPermission,
      },
      {
        id: 'manageUser',
        path: '/manageUser',
        sidebarName: 'Danh sách người dùng',
        navbarName: 'Giao diện quản lý danh sách người dùng',
        icon: Person,
        component: UserManagement,
      },
    ],
  },
  {
    id: 'logManager',
    path: '/logManager',
    sidebarName: 'Quản lý log',
    navbarName: 'Giao diện quản lý log truy cập',
    icon: 'content_paste',
    component: LogManagement,
  },
  {
    id: 'serviceManager',
    path: '/serviceManager',
    sidebarName: 'Quản lý dịch vụ',
    navbarName: 'Giao diện quản lý dịch vụ truy cập',
    icon: LibraryBooks,
    component: ServiceManager,
  },
  {
    id: 'attackReport',
    path: '/attackReport',
    sidebarName: 'Phát hiện tấn công',
    navbarName: 'Giao diện phát hiện tấn công',
    icon: BubbleChart,
    component: AttackReport,
  },
  {
    id: 'login',
    path: '/login',
    sidebarName: 'Đăng xuất',
    icon: PowerIcon,
    component: <Redirect to="/login" />,
  },
  {
    id: 'profile',
    path: '/profile',
    component: UserProfile,
    navbarName: 'Profile',
  },
  {
    id: 'discover',
    path: '/discover',
    component: Discover,
    navbarName: 'Profile',
  },
  {
    id: 'redirect',
    redirect: true,
    path: '/',
    to: '/dashboard',
    navbarName: 'Redirect',
  },
];

// const user = GetUserInfo();
// let ret;
// console.log(user);
// if (user == {}) ret = dashboardRoutes;
// else ret = dashboardRoutes.filter((val, index) => user.accessArr[index]);
// console.log(ret);
// console.log(user);

export default dashboardRoutes;
