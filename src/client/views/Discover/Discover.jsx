import React, { Component } from 'react';
import BarChart from 'components/Chart/BarChart/BarChart.js';
import genChartData from '_helpers/Utils/genChartData.js';

class Discover extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <BarChart data={genChartData(10000)} />
      </div>
    );
  }
}

export default Discover;
