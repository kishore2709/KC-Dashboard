import React from 'react';
// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import PowerIcon from '@material-ui/icons/PowerOff';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import AssignmentIcon from '@material-ui/icons/Assignment';
// Loadable
import Loadable from 'react-loadable';
import TableLoader from 'components/ContentLoader/TableLoader.jsx';
import { Redirect } from 'react-router-dom';
// import { PostApi, ip } from '_helpers/Utils';
import { aimlActions } from '_actions';
import { store } from '_helpers';
// import SvgIcon from '@material-ui/core/SvgIcon';

// function HomeIcon(props) {
//   return (
//     <SvgIcon {...props}>
//       <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
//     </SvgIcon>
//   );
// }

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

const ChatbotManagement = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ChatbotManagement", webpackPrefetch: true */ 'views/ChatbotManagement/ChatbotManagement.jsx'),
  loading: TableLoader,
});

//chat bot create//////////////////////
const CustomQuestion = Loadable({
  loader: () =>
    import(/* webpackChunkName: "CustomQuestion", webpackPrefetch: true */ 'views/CreateChatbot/CustomQuestion.jsx'),
  loading: TableLoader,
});

const BasicInfo = Loadable({
  loader: () =>
    import(/* webpackChunkName: "BasicInfo", webpackPrefetch: true */ 'views/CreateChatbot/BasicInfo.jsx'),
  loading: TableLoader,
});

const DefaultQuestion = Loadable({
  loader: () =>
    import(/* webpackChunkName: "DefaultQuestion", webpackPrefetch: true */ 'views/CreateChatbot/DefaultQuestion.jsx'),
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
  // {
  //   id: 'home',
  //   path: '/home',
  //   sidebarName: 'Home',
  //   icon: HomeIcon,
  //   component: Home,
  // },
  // {
  //   id: 'dashboard',
  //   path: '/dashboard',
  //   sidebarName: 'Dashboard',
  //   icon: Dashboard,
  //   component: <div>Hello</div>,
  // },
  {
    id: 'chatbotManagement',
    path: '/chatbotManagement',
    sidebarName: 'Quản lý Chatbot',
    icon: AssignmentIcon,
    component: ChatbotManagement,
  },
  {
    id: 'createChatbot',
    path: '/createChatbot',
    sidebarName: 'Tạo Chatbot',
    icon: AssignmentIcon,
    subPaths: [
      {
        id: 'basicInfo',
        path: '/basicInfo',
        sidebarName: 'Thông tin cơ bản',
        component: BasicInfo,
      },
      {
        id: 'defaultQuestion',
        path: '/defaultQuestion',
        sidebarName: 'Nhập câu hỏi mặc định',
        component: DefaultQuestion,
      },
      {
        id: 'customQuestion',
        path: '/customQuestion',
        sidebarName: 'Nhập dữ liệu cá nhân',
        component: CustomQuestion,
      },
    ]
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
    to: '/',
    navbarName: 'Redirect',
  },
];

export default dashboardRoutes;
