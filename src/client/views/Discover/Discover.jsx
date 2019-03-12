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
    const { getDashboardData } = this.props;
    getDashboardData({startDate, endDate});
  }

  render() {
    const { dashboard } = this.props;
    const { data, targetCity } = dashboard;
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
      if (data[targetCity].startDate != null) {
        startDate = new Date(parseInt(data[targetCity].startDate, 10))
      } else {
        chartData[0].data = chartData[0].data.length > 0 
                          ? chartData[0].data
                          : [{x: new Date()}]
        startDate = chartData[0].data[0].x < chartData[1].data[0].x 
                    ? chartData[0].data[0].x 
                    : chartData[1].data[0].x  
      }
      if (data[targetCity].endDate != null) {
        endDate = new Date(parseInt(data[targetCity].endDate, 10))
      } else {
        chartData[1].data = chartData[1].data.length > 0 
                          ? chartData[1].data
                          : [{x: new Date()}]
        endDate = chartData[0].data[chartData[0].data.length - 1].x > chartData[1].data[chartData[1].data.length - 1].x 
                    ? chartData[0].data[chartData[0].data.length - 1].x 
                    : chartData[1].data[chartData[1].data.length - 1].x  
      }
    }
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
});
export default connect(state => ({ dashboard: state.dashboard }), mapDispatchToProps)(Discover);
