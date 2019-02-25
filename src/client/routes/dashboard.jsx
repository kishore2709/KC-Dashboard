// import React from 'react';
import React from 'react';
// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
// import ContentPaste from "@material-ui/icons/ContentPaste";
// import LibraryBooks from '@material-ui/icons/LibraryBooks';
// import BubbleChart from '@material-ui/icons/BubbleChart';
// import LocationOn from '@material-ui/icons/LocationOn';
// import Notifications from '@material-ui/icons/Notifications';
// import AccessIcon from '@material-ui/icons/AccessibilityNew';
import PowerIcon from '@material-ui/icons/PowerOff';
// import Unarchive from '@material-ui/icons/Unarchive';
// Loadable
import Loadable from 'react-loadable';
import TableLoader from 'components/ContentLoader/TableLoader.jsx';
// import Icons from 'views/Icons/Icons.jsx';
// import NotificationsPage from 'views/Notifications/Notifications.jsx';
import { Redirect } from 'react-router-dom';

// core components/views

// import UserProfile from 'views/UserProfile/UserProfile.jsx';
const UserProfile = Loadable({
  loader: () =>
    import(/* webpackChunkName: "UserProfile", webpackPrefetch: true */ 'views/UserProfile/UserProfile.jsx'),
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
    sidebarName: 'Dashboard',
    icon: Dashboard,
    // component: AIML,
  },
  {
    id: 'chatbot',
    path: '/chatbot',
    sidebarName: 'Chọn Chatbot',
    icon: Dashboard,
    subPaths: [
      { id: 'user', path: '/user', sidebarName: 'Nhập liệu', icon: Dashboard },
      {
        id: 'user',
        path: '/user',
        sidebarName: 'Nhập liệu',
        icon: Dashboard,
      },
    ],
  },
  {
    id: 'topic',
    path: '/topic',
    sidebarName: 'Chọn Topic',
    icon: Dashboard,
    subPaths: [
      { id: 'user', path: '/user', sidebarName: 'Nhập liệu', icon: Dashboard },
      {
        id: 'user',
        path: '/user',
        sidebarName: 'Nhập liệu',
        icon: Dashboard,
      },
    ],
  },
  {
    id: 'profile',
    path: '/profile',
    sidebarName: 'Tài khoản',
    component: UserProfile,
    icon: Person,
    navbarName: 'Profile',
  },
  {
    id: 'login',
    path: '/login',
    sidebarName: 'Đăng xuất',
    icon: PowerIcon,
    component: <Redirect to="/login" />,
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
