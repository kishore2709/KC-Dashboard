import React, { Component } from 'react';
import BarChart from 'components/Chart/BarChart/BarChart.js';
import data from '_helpers/Utils/genChartData.js';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
          <Checkboxs />
        </Grid>
        <Grid item xs={9}>
          <BarChart data={data} />
        </Grid>
        <Grid item xs={12}>
          <TableDiscover />
        </Grid>
      </Grid>
    );
  }
}

export default Discover;
