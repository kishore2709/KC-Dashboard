import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Line } from 'react-chartjs-2';
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

class LineChartCore extends Component {
  chartReference = {};

  chart = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.chart = this.chartReference.chartInstance;
  }

  handleElementsClick = elems => {
    if (elems[0] != null && elems[0]._index != null) {
      const curElem = this.chart.data.datasets[0].data[elems[0]._index];
      const startDate = new Date(curElem.x.getTime() - 1000 * 60 * 60 * 4);
      const endDate = new Date(curElem.x.getTime() + 1000 * 60 * 60 * 4);
      this.props.fireUpDateRangeChange(startDate, endDate);
    }
  };

  handleChangeDateZoom = () => {
    const startDate = new Date(this.chart.scales['x-axis-0'].min);
    const endDate = new Date(this.chart.scales['x-axis-0'].max);
    this.chart.resetZoom();
    this.props.fireUpDateRangeChange(startDate, endDate);
  };

  render() {
    const { datasets, startDate, endDate, classes, color } = this.props;
    
    console.log(datasets)

    return (
      <Line
        ref={reference => (this.chartReference = reference)}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            display: true,
          },
          scales: {
            xAxes: [
              {
                type: 'time',
                display: true,
                distribution: 'linear',
                time: {
                  min: startDate.getTime(),
                  max: endDate.getTime(),
                },
              },
            ],
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
          },
          zoom: {
            enabled: true,
            drag: true,
            mode: 'x',
            onZoom: () => {
              this.handleChangeDateZoom();
            },
          },
          elements: {
            line: {
                tension: 0, // disables bezier curves
            }
          },
          animation: {
            onComplete: anim => {
              if (typeof this.props.fireUpImageURL === 'function') {
                this.props.fireUpImageURL(this.chart.toBase64Image())
              }
            },
          }
        }}
        data={{
          datasets: datasets,
        }}
        onElementsClick={this.handleElementsClick}
      />
    );
  }
}

LineChartCore.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LineChartCore);
