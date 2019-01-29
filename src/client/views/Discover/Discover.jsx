import React, { Component } from 'react';
import BarChart from 'components/Chart/BarChart/BarChart.js';
import data from '_helpers/Utils/genChartData.js';
import Paper from '@material-ui/core/Paper';

class Discover extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper>
        <BarChart data={data} />
      </Paper>
    );
  }
}

export default Discover;
