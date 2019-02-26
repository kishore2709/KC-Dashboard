import React from 'react';
import ListBox from 'components/List/List.jsx';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

class ChatBot extends React.Component {
  render() {
    const { aiml } = this.props;
    // console.log(arrayItems);
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <ListBox
          listname="Danh sách chatbot"
          placeholder="Nhập tên chatbot"
          arrayItems={aiml.listchatbot.map(({ id_chatbot, chatbot_name }) => ({
            id: id_chatbot,
            name: chatbot_name,
          }))}
        />
      </Grid>
    );
  }
}

export default connect(state => ({ aiml: state.aiml }))(ChatBot);
