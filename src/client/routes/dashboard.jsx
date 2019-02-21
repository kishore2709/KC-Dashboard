// import React from 'react';
import React from 'react';
// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
// import LocationOn from '@material-ui/icons/LocationOn';
// import Notifications from '@material-ui/icons/Notifications';
import AccessIcon from '@material-ui/icons/AccessibilityNew';
import PowerIcon from '@material-ui/icons/PowerOff';
// import Unarchive from '@material-ui/icons/Unarchive';
// Loadable
import Loadable from 'react-loadable';
import TableLoader from 'components/ContentLoader/TableLoader.jsx';
// import Icons from 'views/Icons/Icons.jsx';
// import NotificationsPage from 'views/Notifications/Notifications.jsx';
import { Redirect } from 'react-router-dom';

// core components/views
// import UserPermission from 'views/UserPermission/UserPermission.jsx';
const UserPermission = Loadable({
  loader: () =>
    import(/* webpackChunkName: "UserPermission", webpackPrefetch: true */ 'views/UserPermission/UserPermission.jsx'),
  loading: TableLoader,
});
// import GroupPermission from 'views/GroupPermission/GroupPermission.jsx';
const GroupPermission = Loadable({
  loader: () =>
    import(/* webpackChunkName: "GroupPermission", webpackPrefetch: true */ 'views/GroupPermission/GroupPermission.jsx'),
  loading: TableLoader,
});
// import DashboardPage from 'views/Dashboard/Dashboard.jsx';
const DashboardPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "DashboardPage", webpackPrefetch: true */ 'views/Dashboard/Dashboard.jsx'),
  loading: TableLoader,
});
// import UserManagement from 'views/UserManagement/UserManagement.jsx';
const UserManagement = Loadable({
  loader: () =>
    import(/* webpackChunkName: "UserManagement", webpackPrefetch: true */ 'views/UserManagement/UserManagement.jsx'),
  loading: TableLoader,
});
// import LogManagement from 'views/LogManagement/LogManagement.jsx';
const LogManagement = Loadable({
  loader: () =>
    import(/* webpackChunkName: "LogManagement", webpackPrefetch: true */ 'views/LogManagement/LogManagement.jsx'),
  loading: TableLoader,
});
// import ServiceManager from 'views/ServiceManager/ServiceManager.jsx';
const ServiceManager = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ServiceManager", webpackPrefetch: true */ 'views/ServiceManager/ServiceManager.jsx'),
  loading: TableLoader,
});
// import AttackReport from 'views/AttackReport/AttackReport.jsx';
const AttackReport = Loadable({
  loader: () =>
    import(/* webpackChunkName: "AttackReport", webpackPrefetch: true */ 'views/AttackReport/AttackReport.jsx'),
  loading: TableLoader,
});

// import UserProfile from 'views/UserProfile/UserProfile.jsx';
const UserProfile = Loadable({
  loader: () =>
    import(/* webpackChunkName: "UserProfile", webpackPrefetch: true */ 'views/UserProfile/UserProfile.jsx'),
  loading: TableLoader,
});
// import Discover from 'views/Discover/Discover.jsx';
const Discover = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Discover",  webpackPrefetch: true */ 'views/Discover/Discover.jsx'),
  loading: TableLoader,
});

const AIML = Loadable({
  loader: () =>
    import(/* webpackChunkName: "AIML", webpackPrefetch: true */ 'views/AIML/AIML.jsx'),
  loading: TableLoader,
});

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
    id: 'aiml',
    path: '/aiml',
    sidebarName: 'Nhập liệu',
    navbarName: 'Giao diện nhập liệu',
    icon: Dashboard,
    component: AIML,
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
    to: '/aiml',
    navbarName: 'Redirect',
  },
];

export default dashboardRoutes;
