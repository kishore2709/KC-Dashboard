import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-zoom';

const styles = theme => ({
  root: {
    borderRadius: 10,
    border: 0,
    color: 'white',
    padding: '0 3px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
});

class PieChartCore extends Component {
  chartReference = {};

  chart = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.chart = this.chartReference.chartInstance;
  }

  render() {

    return (
      <Doughnut
        ref={reference => (this.chartReference = reference)}
        width={300}
        height={300}
        data={{
          datasets: [{
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
            data: [2478,5267,734],
          }],
          labels: [
            'Sample 1',
            'Sample 2',
            'Sample 3',
          ]
        }}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          animation: {
            onComplete: anim => {
              if (typeof this.props.fireUpImageURL === 'function') {
                this.props.fireUpImageURL(this.chart.toBase64Image())
              }
            },
          }
        }}
      />
    );
  }
}

PieChartCore.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PieChartCore);
