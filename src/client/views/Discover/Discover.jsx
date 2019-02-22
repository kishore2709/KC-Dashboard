import React, { Component } from 'react';
// loader
import Loadable from 'react-loadable';
import TableLoader from 'components/ContentLoader/TableLoader.jsx';

// import LineChart from 'components/Chart/LineChart/LineChart.js';
// import BarLineChart from 'components/Chart/BarLineChart/BarLineChart.js';
import { generateData } from '_helpers/Utils/genChartData.js';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//
// import BarChart from 'components/Chart/BarChart/BarChart.js';
const BarChart = Loadable({
  loader: () => import(/* webpackPreload: true */ 'components/Chart/BarChart/BarChart.js'),
  loading: TableLoader,
});

const LineChart = Loadable({
  loader: () => import(/* webpackPreload: true */ 'components/Chart/LineChart/LineChart.js'),
  loading: TableLoader,
});
// import Selections from 'components/SelectionControls/Selections.jsx';
// import Checkboxs from 'components/SelectionControls/Checkboxs.jsx';

// import TableDiscover from 'components/Table/TableDiscover.jsx';
const TableDiscover = Loadable({
  loader: () =>
    import(/* webpackPreload: true */ 'components/Table/TableDiscover.jsx'),
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
          <LineChart data={[
            {label: 'Data 1', data: generateData(2000).chartData},  // ok
            {data: generateData(2000).chartData},                   // failed, thiếu label
            {label: 'Data 3', data: generateData(2000).chartData},  // ok
            {label: 'Data 4'},                                      // failed, thiếu data
            {label: 'Data 5', data: generateData(2000).chartData},  // ok
            {label: 6, data: generateData(2000).chartData},         // ok
            {label: 'Data 7', data: 'generateData(2000).chartData'},// failed, data phải là array
          ]} />
        </Grid>
        <Grid item xs={12}>
          <TableDiscover />
        </Grid>
      </Grid>
    );
  }
}

export default Discover;
