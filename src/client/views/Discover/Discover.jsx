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
import { connect } from 'react-redux';

const LineChart = Loadable({
  loader: () =>
    import(/* webpackPreload: true */ 'components/Chart/LineChart/LineChart.js'),
  loading: TableLoader,
});
// import TableDiscover from 'components/Table/TableDiscover.jsx';
// const TableDiscover = Loadable({
//   loader: () =>
//     import(/* webpackPreload: true */ 'components/Table/TableDiscover.jsx'),
//   loading: TableLoader,
// });
class Discover extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dashboard } = this.props;
    const { data, targetCity } = dashboard;
    let chartData = [];
    if (data.length) {
      chartData = [
        {
          label: 'Dns Logs',
          data: data[targetCity].dnslogs.map(({ timestamp, count }) => ({
            x: new Date(timestamp),
            y: count,
          })).sort((a, b) => (a.x - b.x)),
        },
        {
          label: 'Web Logs',
          data: data[targetCity].weblogs.map(({ timestamp, count }) => ({
            x: new Date(timestamp),
            y: count,
          })).sort((a, b) => (a.x - b.x)),
        },
      ];
    }
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
          <LineChart data={chartData} />
        </Grid>
        {/* <Grid item xs={12}>
          <TableDiscover />
        </Grid> */}
      </Grid>
    );
  }
}

export default connect(state => ({ dashboard: state.dashboard }))(Discover);
