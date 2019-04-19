import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { mailActions } from '../../_actions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { history } from '_helpers';
import LocationTable from '../../components/Table/LocationTable';
const styles = {
  btnEmail: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: '3%',
    paddingRight: '3%',
    marginTop: '5px',
  },
  textSender: {
    fontSize: "12px",
    fontWeight: 'bold',
    marginRight: '45px',
  },
  textContent: {
    fontSize: "12px",
    alignItems: "flex-start",
    maxWidth: '60%'
  }
};
class LocationManager extends React.Component {

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <LocationTable />
        </Grid>
      </Grid>
    );
  }

}

LocationManager.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(withStyles(styles)(LocationManager));
