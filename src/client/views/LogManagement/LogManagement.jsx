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
import { dashboardActions } from '_actions';

const LineChart = Loadable({
  loader: () =>
    import(/* webpackPreload: true */ 'components/Chart/LineChart/LineChart.js'),
  loading: TableLoader,
});
// import TableDiscover from 'components/Table/TableDiscover.jsx';
const DNSTable = Loadable({
  loader: () =>
    import(/* webpackPreload: true */ './DNSTable.jsx'),
  loading: TableLoader,
});

const WebTable = Loadable({
  loader: () =>
    import(/* webpackPreload: true */ './WebTable.jsx'),
  loading: TableLoader,
});
class Discover extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { getDashboardData } = this.props;
    getDashboardData();
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
        spacing={24}
      >
        {/*
        <Grid item>
          <Selections />
        </Grid>
        */}
        <Grid item xs={12}>
          <LineChart data={chartData} height='300px' />
        </Grid>
        <Grid item xs={12}>
          <DNSTable />
        </Grid>
        <Grid item xs={12}>
          <WebTable/>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getDashboardData: newStatus => {
    dispatch(dashboardActions.get(newStatus));
  },
});
export default connect(state => ({ dashboard: state.dashboard }), mapDispatchToProps)(Discover);
