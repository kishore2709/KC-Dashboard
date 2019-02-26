import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Input from '@material-ui/core/Input';
import SvgIcon from '@material-ui/core/SvgIcon';
import Grid from '@material-ui/core/Grid';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import { aimlActions } from '_actions';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    border: '1px solid black',
    borderRadius: '5px',
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    display: 'flex',
  },
  center: {
    margin: 'auto',
  },
  button: {
    marginLeft: '15px',
  },
  list: {
    padding: '10px',
  },
});

// const chatbots = ['Thái Bình', 'Cần Thơ', 'Hà Nội'];

class SelectedListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newChatbot: '',
    };
    this.notificationSystem = React.createRef();
  }

  handleInputChange = e => {
    this.setState({ newChatbot: e.target.value });
  };

  handleAddChatbot = () => {
    const { dispatch } = this.props;
    const { newChatbot } = this.state;
    dispatch(aimlActions.addChatbot({ chatbot: newChatbot }));
  };

  addNotification = (event, message, level) => {
    event.preventDefault();
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message,
      level,
      position: 'br',
    });
  };

  render() {
    const { classes, listname, placeholder, aiml } = this.props;
    const { listchatbot } = aiml;

    const EditIcon = (
      <SvgIcon>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="edit"
          className="svg-inline--fa fa-edit fa-w-18"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="currentColor"
            d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
          />
        </svg>
      </SvgIcon>
    );
    // console.log(listname, arrayItems);
    return (
      <div className={classes.root}>
        <NotificationSystem ref={this.notificationSystem} />
        <List
          className={classes.list}
          component="nav"
          subheader={
            <ListSubheader
              component="div"
              align="center"
              color="primary"
              style={{ fontSize: '16px' }}
            >
              {listname}
            </ListSubheader>
          }
        >
          <ListItem
            key="AddChatbot"
            alignItems="center"
            className={classes.container}
          >
            <Grid container className={classes.center}>
              <Grid item xs={9}>
                <Input
                  placeholder={placeholder}
                  fullWidth
                  onChange={this.handleInputChange}
                  inputProps={{
                    'aria-label': 'Description',
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.handleAddChatbot}
                >
                  Thêm
                </Button>
              </Grid>
            </Grid>
          </ListItem>
          {listchatbot.map((val, index) => (
            <React.Fragment key={index}>
              <ListItem button key={index}>
                <ListItemText primary={val.chatbot_name} />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Edit"
                    onClick={e => {
                      // this.addNotification(e, 'Add ok', 'success');
                    }}
                  >
                    {EditIcon}
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    onClick={e => {
                      this.props.dispatch(
                        aimlActions.deleteChatbot({
                          chatbot: val.chatbot_name,
                        })
                      );
                    }}
                  >
                    <HighlightOff />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </div>
    );
  }
}

SelectedListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(state => ({ aiml: state.aiml }))(
  withStyles(styles)(SelectedListItem)
);
