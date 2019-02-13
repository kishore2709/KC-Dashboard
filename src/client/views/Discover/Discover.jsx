import React, { Component } from 'react';
// loader
import Loadable from 'react-loadable';
import TableLoader from 'components/ContentLoader/TableLoader.jsx';
//
// import BarChart from 'components/Chart/BarChart/BarChart.js';
const BarChart = Loadable({
  loader: () => import(/* webpackPreload: true */ 'components/Chart/BarChart/BarChart.js'),
  loading: TableLoader,
});

// import LineChart from 'components/Chart/LineChart/LineChart.js';
// import BarLineChart from 'components/Chart/BarLineChart/BarLineChart.js';
import data from '_helpers/Utils/genChartData.js';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import Selections from 'components/SelectionControls/Selections.jsx';
// import Checkboxs from 'components/SelectionControls/Checkboxs.jsx';

// import TableDiscover from 'components/Table/TableDiscover.jsx';
const TableDiscover = Loadable({
  loader: () => import(/* webpackPreload: true */ 'components/Table/TableDiscover.jsx'),
  loading: TableLoader,
});
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
        {/*
        <Grid item>
          <Selections />
        </Grid>
        */}
        <Grid item xs={12}>
          <BarChart data={data.chartData} color="#c0dfd9" />
        </Grid>
        <Grid item xs={12}>
          <TableDiscover />
        </Grid>
      </Grid>
    );
  }
}

export default Discover;
