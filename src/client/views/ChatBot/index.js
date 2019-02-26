import React from 'react';
import Loadable from 'react-loadable';
import TableLoader from 'components/ContentLoader/TableLoader.jsx';

import { PostApi, ip } from '_helpers/Utils';
import { aimlActions } from '_actions';
import { connect } from 'react-redux';
import { store } from '_helpers';

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
    console.log('in render..', loaded, props);
    const ChatBot = loaded.ChatBotComponent.default;
    return <ChatBot {...props} />;
  },
});

class ChatBotWrapper extends React.Component {
  render() {
    console.log('???');
    console.log(this.props);
    return <ChatBot {...this.props} />;
  }
}

export default connect()(ChatBotWrapper);
