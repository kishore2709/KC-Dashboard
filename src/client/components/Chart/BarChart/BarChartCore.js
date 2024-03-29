import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Bar } from 'react-chartjs-2';
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

class BarChartCore extends Component {
  chartReference = {};

  chart = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.chart = this.chartReference.chartInstance;
    this.chart.resetZoom();
  }

  handleElementsClick = elems => {
    if (elems[0] != null && elems[0]._index != null) {
      const curElem = this.chart.data.datasets[0].data[elems[0]._index];
      console.log(curElem);
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
    const { data, startDate, endDate,  classes, color } = this.props;

    return (
      <Bar
        ref={reference => (this.chartReference = reference)}
        data={{
          datasets: data.map((dataRow, key) => ({
            label: dataRow.label,
            data: dataRow.data,
            backgroundColor: color[key],
          })),
        }}
        onElementsClick={this.handleElementsClick}
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
        }}
      />
    );
  }
}

BarChartCore.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BarChartCore);
