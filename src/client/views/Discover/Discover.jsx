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

class Discover extends Component {

  constructor(props) {
    super(props);
  }

  /*
  componentDidMount() {
    this.handleDateRangeChange(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date());
  }
  */

  handleDateRangeChange = (startDate, endDate) => {
    const { getDashboardData, dashboard } = this.props;
    getDashboardData({
      ...dashboard,
      dateRange: {
        start: startDate,
        end: endDate,
      },
    });
  }

  render() {
    const { dashboard } = this.props;
    const { data } = dashboard;
    const chartData = [
      {
        label: 'DNS Logs',
        data: data.dnslogs.map(({ timestamp, count }) => ({
          x: new Date(timestamp),
          y: count,
        })).sort((a, b) => (a.x - b.x)),
      },
      {
        label: 'Web Logs',
        data: data.weblogs.map(({ timestamp, count }) => ({
          x: new Date(timestamp),
          y: count,
        })).sort((a, b) => (a.x - b.x)),
      },
    ];
    const startDate = dashboard.dateRange.start
    const endDate = dashboard.dateRange.end
    return (
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        spacing={24}
      >
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
  }
});
export default connect(state => ({ dashboard: state.dashboard }), mapDispatchToProps)(Discover);
