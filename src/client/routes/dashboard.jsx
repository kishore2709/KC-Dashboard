import React from 'react';
// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import PowerIcon from '@material-ui/icons/PowerOff';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
// Loadable
import Loadable from 'react-loadable';
import TableLoader from 'components/ContentLoader/TableLoader.jsx';
import { Redirect } from 'react-router-dom';
import { PostApi, ip } from '_helpers/Utils';
import { aimlActions } from '_actions';
import { store } from '_helpers';
import SvgIcon from '@material-ui/core/SvgIcon';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

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

const Home = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Home", webpackPrefetch: true */ 'views/Home/Home.jsx'),
  loading: TableLoader,
});

const ChatBot = Loadable.Map({
  loader: {
    ChatBotComponent: () =>
      import(/* webpackChunkName: "ChatBot", webpackPrefetch: true */ 'views/ChatBot/ChatBot.jsx'),
    arrayItems: () =>
      new Promise(resolve => {
        resolve(store.dispatch(aimlActions.getListChatbot()));
      }),
  },
  loading: TableLoader,
  render(loaded, props) {
    const ChatBot = loaded.ChatBotComponent.default;
    return <ChatBot {...props} />;
  },
});

const Topic = Loadable.Map({
  loader: {
    TopicComponent: () =>
      import(/* webpackChunkName: "Topic", webpackPrefetch: true */ 'views/Topic/Topic.jsx'),
    arrayItems: () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(['Câu hỏi chung']);
        }, 2000);
      }),
  },
  loading: TableLoader,
  render(loaded, props) {
    const Topic = loaded.TopicComponent.default;
    const { arrayItems } = loaded;
    return <Topic {...props} arrayItems={arrayItems} />;
  },
});

const dashboardRoutes = [
  {
    id: 'home',
    path: '/home',
    sidebarName: 'Home',
    icon: HomeIcon,
    component: Home,
  },
  {
    id: 'dashboard',
    path: '/dashboard',
    sidebarName: 'Dashboard',
    icon: HomeIcon,
    // component: ,
  },
  {
    id: 'chatbot',
    path: '/chatbot',
    sidebarName: 'Chọn Chatbot',
    icon: Dashboard,
    component: ChatBot,
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
    component: Topic,
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
    id: 'aiml',
    path: '/aiml',
    sidebarName: 'Q/A',
    component: AIML,
    icon: AddCircleOutline,
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
    to: '/home',
    navbarName: 'Redirect',
  },
];

export default dashboardRoutes;
