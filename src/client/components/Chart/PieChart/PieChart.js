import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import PieChartCore from './PieChartCore';
import { connect } from 'react-redux';
import { addPieChartImageURL, chartActions } from '../../../_actions/chart.actions';

const styles = theme => ({
  hidden: {
    position: 'absolute',
    top: '-1000px',
    left: '-1000px',
  }
});

function printablePieChart(props) {

  function handleImageURL(imageURL) {
    const { dispatch } = props;
    dispatch(chartActions.addPieChartImageURL(imageURL));
  }

  const { classes } = props;

  return (
    <div className={classes.hidden}>
      <PieChartCore
        fireUpImageURL={handleImageURL}
      />
    </div>
  );
}

printablePieChart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect()(printablePieChart));
