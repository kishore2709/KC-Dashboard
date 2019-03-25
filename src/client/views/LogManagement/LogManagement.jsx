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
import Loading from 'components/Loading/Loading.jsx';

const LineChart = Loadable({
  loader: () => import('components/Chart/LineChart/LineChart.js'),
  loading: TableLoader,
});
// import TableDiscover from 'components/Table/TableDiscover.jsx';
const DNSTable = Loadable({
  loader: () => import('./DNSTable.jsx'),
  loading: TableLoader,
});

const WebTable = Loadable({
  loader: () => import('./WebTable.jsx'),
  loading: TableLoader,
});

const LogTable = Loadable({
  loader: () => import('components/LogTable/LogTable.js'),
  loading: TableLoader,
});

class Discover extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
    console.log('..log manager will mount');
    const startDate =
      this.props.dateRange.start ||
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const endDate = this.props.dateRange.end || new Date();
    this.handleDateRangeChange(startDate, endDate);
  }

  componentDidMount() {
    console.log('component Didmount');
  }

  handleDateRangeChange = (startDate, endDate) => {
    const { getDashboardData, targetCity } = this.props;
    getDashboardData({
      targetCity,
      dateRange: {
        start: startDate,
        end: endDate,
      },
    });
  };

  render() {
    const { dateRange, data, loading } = this.props;
    const chartData = [
      {
        label: 'DNS Logs',
        data: data.dnslogs
          .map(({ timestamp, count }) => ({
            x: new Date(timestamp),
            y: count,
          }))
          .sort((a, b) => a.x - b.x),
      },
      {
        label: 'Web Logs',
        data: data.weblogs
          .map(({ timestamp, count }) => ({
            x: new Date(timestamp),
            y: count,
          }))
          .sort((a, b) => a.x - b.x),
      },
    ];
    const startDate = dateRange.start;
    const endDate = dateRange.end;
    console.log('logmanager render');
    // if (loading) return <Loading />;
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
          <LineChart
            data={chartData}
            height="200px"
            fireUpDateRangeChange={this.handleDateRangeChange}
            allDataLabel={['DNS Logs', 'Web Logs']}
            startDate={startDate}
            endDate={endDate}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <DNSTable />
        </Grid>
        <Grid item xs={12}>
          <WebTable />
        </Grid>
        <Grid item xs={12}>
          <LogTable />
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getDashboardData: newStatus => {
    dispatch(dashboardActions.get(newStatus));
  },
  changeDateRange: newStatus => {
    dispatch(dashboardActions.changeDateRange(newStatus));
  },
});
export default connect(
  state => ({
    data: state.dashboard.data,
    dateRange: state.dashboard.dateRange,
    targetCity: state.dashboard.targetCity,
    loading: state.dashboard.loading,
  }),
  mapDispatchToProps
)(Discover);
