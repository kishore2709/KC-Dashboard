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

const LogTable = Loadable({
  loader: () => import(/* webpackPreload: true */'components/LogTable/LogTable.js'),
  loading: TableLoader,
});

class Discover extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getDashboardData } = this.props;
    getDashboardData();
  }

  handleDateRangeChange = (startDate, endDate) => {
    const { getDashboardData } = this.props;
    getDashboardData({startDate, endDate});
  }

  render() {
    const { dashboard } = this.props;
    const { data, targetCity } = dashboard;
    console.log(dashboard);
    let chartData = [];
    let startDate = new Date();
    let endDate = new Date();
    if (data.length) {
      chartData = [
        {
          label: 'DNS Logs',
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
      chartData[0].data = chartData[0].data.length > 0 
                          ? chartData[0].data
                          : [{x: new Date()}]
      chartData[1].data = chartData[1].data.length > 0 
                          ? chartData[1].data
                          : [{x: new Date()}]
      startDate = chartData[0].data[0].x < chartData[1].data[0].x 
                    ? chartData[0].data[0].x 
                    : chartData[1].data[0].x
      endDate = chartData[0].data[chartData[0].data.length - 1].x > chartData[1].data[chartData[1].data.length - 1].x 
                    ? chartData[0].data[chartData[0].data.length - 1].x 
                    : chartData[1].data[chartData[1].data.length - 1].x
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
          <LineChart 
            data={chartData} 
            height='200px' 
            fireUpDateRangeChange={this.handleDateRangeChange}
            allDataLabel={['DNS Logs', 'Web Logs']}
            startDate={startDate}
            endDate={endDate}
            loading={dashboard.loading}
          />
        </Grid>
        <Grid item xs={12}>
          <DNSTable />
        </Grid>
        <Grid item xs={12}>
          <WebTable/>
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
});
export default connect(state => ({ dashboard: state.dashboard }), mapDispatchToProps)(Discover);
