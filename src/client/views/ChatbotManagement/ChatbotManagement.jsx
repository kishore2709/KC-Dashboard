import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

class ChatbotManagement extends React.Component {
  render() {
    return (
      <Grid container>
        <Grid item>
          <Fab variant="extended" color="primary" aria-label="Add">
            <AddIcon />
            Tạo mới chatbot
          </Fab>
        </Grid>
      </Grid>
    );
  }
}

export default ChatbotManagement;
