import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  root: {
    textAlign: 'center',
    margin: 'auto',
  },
};

function Loadding(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" disableShrink />
    </div>
  );
}

Loadding.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loadding);
