// import React from 'react';
import React from 'react';
// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import MailOutline from '@material-ui/icons/MailOutline';
import ExitToApp from '@material-ui/icons/ExitToApp';


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
    import(/* webpackPrefetch: true */ 'views/UserPermission/UserPermission.jsx'),
  loading: TableLoader,
});
// import GroupPermission from 'views/GroupPermission/GroupPermission.jsx';
const GroupPermission = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true */ 'views/GroupPermission/GroupPermission.jsx'),
  loading: TableLoader,
});
// import DashboardPage from 'views/Dashboard/Dashboard.jsx';

// const DashboardLoader = <div style={{ marginTop: '100px' }}><TableLoader /></div>;
const DashboardPage = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true */ 'views/Dashboard/Dashboard.jsx'),
  loading: () => <div style={{ marginTop: '100px' }}><TableLoader /></div>,
});
// import UserManagement from 'views/UserManagement/UserManagement.jsx';
const UserManagement = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true */ 'views/UserManagement/UserManagement.jsx'),
  loading: TableLoader,
});
// import LogManagement from 'views/LogManagement/LogManagement.jsx';
const LogManagement = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true */ 'views/LogManagement/LogManagement.jsx'),
  loading: TableLoader,
});
// import ServiceManager from 'views/ServiceManager/ServiceManager.jsx';
const ServiceManager = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true */ 'views/ServiceManager/ServiceManager.jsx'),
  loading: TableLoader,
});
// import AttackReport from 'views/AttackReport/AttackReport.jsx';
const AttackReport = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true */ 'views/AttackReport/AttackReport.jsx'),
  loading: TableLoader,
});

// import UserProfile from 'views/UserProfile/UserProfile.jsx';
const UserProfile = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true */ 'views/UserProfile/UserProfile.jsx'),
  loading: TableLoader,
});
// import Discover from 'views/Discover/Discover.jsx';
const Discover = Loadable({
  loader: () =>
    import(/* webpackPrefetch: true */ 'views/Discover/Discover.jsx'),
  loading: TableLoader,
});
// import MailBox from 'views/MailBox/MailBox.jsx';
const MailBox = Loadable({
  loader: () => import(/* webpackPrefetch: true */ 'views/MailBox/MailBox.jsx'),
  loading: TableLoader,
});

// import DetailsMail from 'views/DetailsMail/DetailsMail.jsx';
const DetailsMail = Loadable({
  loader: () => import(/* webpackPrefetch: true */ '../views/DetailsMail/DetailsMail.jsx'),
  loading: TableLoader,
});

// import ExportData from 'views/ExportData/ExportData.jsx';
const ExportData = Loadable({
  loader: () => import(/* webpackPrefetch: true */ '../views/ExportData/ExportData.jsx'),
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
    id: 'mailBox',
    path: '/mailBox',
    sidebarName: 'Hòm thư cảnh báo',
    navbarName: 'Giao diện hộp thư đến',
    icon: MailOutline,
    component: MailBox,
  },
  {
    id: 'exportData',
    path: '/exportData',
    sidebarName: 'Xuất dữ liệu',
    navbarName: 'Giao diện xuất dữ liệu',
    icon: ExitToApp,
    component: ExportData,
  },
  {
    id: 'logManager',
    path: '/logManager',
    sidebarName: 'Quản lý log',
    navbarName: 'Giao diện quản lý log truy cập',
    icon: LibraryBooks,
    component: LogManagement,
  },
  // {
  //   id: 'serviceManager',
  //   path: '/serviceManager',
  //   sidebarName: 'Quản lý dịch vụ',
  //   navbarName: 'Giao diện quản lý dịch vụ truy cập',
  //   icon: LibraryBooks,
  //   component: ServiceManager,
  // },
  // {
  //   id: 'attackReport',
  //   path: '/attackReport',
  //   sidebarName: 'Phát hiện tấn công',
  //   navbarName: 'Giao diện phát hiện tấn công',
  //   icon: BubbleChart,
  //   component: AttackReport,
  // },
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
  {
    id: 'detailsMail',
    path: '/detailsMail',
    component: DetailsMail,
    navbarName: 'DetailsMail',
  },
];

export default dashboardRoutes;
