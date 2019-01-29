import React, { Component } from 'react';
import BarChart from 'components/Chart/BarChart/BarChart.js';
import data from '_helpers/Utils/genChartData.js';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

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
          <Checkbox />
        </Grid>
        <Grid item xs={9}>
          <BarChart data={data} />
        </Grid>
      </Grid>
    );
  }
}

export default Discover;
