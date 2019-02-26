import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import sidebarStyle from 'assets/jss/material-dashboard-react/components/sidebarStyle.jsx';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withRouter } from 'react-router-dom';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { aimlActions } from '_actions';

class DropDownTopic extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    // this.handleClick = this.handleClick.bind(this);
  }

  activeRoute(routeName) {
    return window.location.pathname.indexOf(routeName) > -1;
  }

  handleClick = (e, topic) => {
    this.props.saveInfo({ topic });
  };

  render() {
    const { open } = this.state;
    const { path, subPaths, icon, id, classes, color, aiml } = this.props;
    const { topic, listtopic } = aiml;
    const listItemClasses = path =>
      classNames({
        [` ${classes[color]}`]: this.activeRoute(path),
      });

    const whiteFontClasses = path =>
      classNames({
        [` ${classes.whiteFont}`]: this.activeRoute(path),
      });
    return (
      <React.Fragment>
        <ListItem
          button
          onClick={() => {
            this.setState(state => ({ open: !state.open }));
          }}
          className={classes.itemLink + listItemClasses(path)}
        >
          <ListItemIcon className={classes.itemIcon + whiteFontClasses(path)}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText
            primary={topic || 'Chọn Topic'}
            className={classes.itemText + whiteFontClasses(path)}
            disableTypography
          />
          <ListItemSecondaryAction>
            <IconButton
              onClick={e => {
                this.props.history.push(path);
              }}
            >
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
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding className={classes.nested}>
            {listtopic.map((val, index) => (
              <NavLink
                to="#"
                className={classes.item}
                activeClassName="active"
                key={index}
              >
                <ListItem
                  button
                  className={classes.itemLink}
                  onClick={e => {
                    this.handleClick(e, val.topic_name);
                  }}
                >
                  <ListItemIcon className={classes.itemIcon}>
                    {val.topic_name === topic ? <DoneIcon /> : <div />}
                  </ListItemIcon>
                  <ListItemText
                    primary={val.topic_name}
                    className={classes.itemText}
                    disableTypography
                  />
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({ aiml: state.aiml }),
  dispatch => ({
    saveInfo: newStatus => {
      dispatch(aimlActions.saveInfo(newStatus));
    },
  })
)(withRouter(withStyles(sidebarStyle)(DropDownTopic)));
