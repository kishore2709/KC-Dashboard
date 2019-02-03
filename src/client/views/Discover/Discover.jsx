import React, { Component } from 'react';
import BarChart from 'components/Chart/BarChart/BarChart.js';
import LineChart from 'components/Chart/LineChart/LineChart.js';
import BarLineChart from 'components/Chart/BarLineChart/BarLineChart.js';
import data from '_helpers/Utils/genChartData.js';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Selections from 'components/SelectionControls/Selections.jsx';
import Checkboxs from 'components/SelectionControls/Checkboxs.jsx';
import TableDiscover from 'components/Table/TableDiscover.jsx';

class Discover extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item>
          <Selections />
        </Grid>
        <Grid item xs={9}>
          <BarLineChart data={data.chartData} color='#c0dfd9' />
        </Grid>
        <Grid item xs={12}>
          <TableDiscover />
        </Grid>
      </Grid>
    );
  }
}

export default Discover;
