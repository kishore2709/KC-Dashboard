import React from 'react';
import Grid from '@material-ui/core/Grid';
import ListBox from './List.jsx';

class ChatBot extends React.Component {
  render() {
    // console.log(arrayItems);
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <ListBox listname="Danh sách chatbot" placeholder="Nhập tên chatbot" />
      </Grid>
    );
  }
}

export default ChatBot;
