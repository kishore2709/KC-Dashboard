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
import TableList from 'views/TableList/TableList.jsx';
import Typography from 'views/Typography/Typography.jsx';
import Icons from 'views/Icons/Icons.jsx';
// import Maps from 'views/Maps/Maps.jsx';
import NotificationsPage from 'views/Notifications/Notifications.jsx';
import UserProfile from 'views/UserProfile/UserProfile.jsx';

const dashboardRoutes = [
  {
    path: '/dashboard',
    sidebarName: 'Trang chủ',
    navbarName: 'PTIT Dashboard',
    icon: Dashboard,
    component: DashboardPage,
  },
  {
    path: '/user',
    sidebarName: 'Quản lý người dùng',
    navbarName: 'User Management',
    icon: Person,
    component: UserManagement,
  },
  {
    path: '/table',
    sidebarName: 'Quản lý log',
    navbarName: 'Giao diện quản lý log truy cập',
    icon: 'content_paste',
    component: TableList,
  },
  {
    path: '/typography',
    sidebarName: 'Quản lý dịch vụ',
    navbarName: 'Giao diện quản lý dịch vụ truy cập',
    icon: LibraryBooks,
    component: Typography,
  },
  {
    path: '/icons',
    sidebarName: 'Phát hiện tấn công',
    navbarName: 'Attack Detection',
    icon: BubbleChart,
    component: Icons,
  },
  {
    path: '/notifications',
    sidebarName: 'Quảng bá cảnh báo',
    navbarName: 'Notifications',
    icon: Notifications,
    component: NotificationsPage,
  },
  {
    path: '/profile',
    component: UserProfile,
  },
  { redirect: true, path: '/', to: '/dashboard', navbarName: 'Redirect' },
];

export default dashboardRoutes;
