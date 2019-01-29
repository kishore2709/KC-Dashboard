import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-zoom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({});

class BarChartCore extends Component {
  chartReference = {};

  chart = {};

  originalDatasets = [];

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.chart = this.chartReference.chartInstance;
  }

  getTimeRange = () => {
    let timeRange;
    switch (this.props.endDate.getTime() - this.props.startDate.getTime()) {
      case 15 * 60 * 1000:
        timeRange = 15 * 60;
        break;
      case 30 * 60 * 1000:
        timeRange = 30 * 60;
        break;
      case 60 * 60 * 1000:
        timeRange = 60 * 60;
        break;
      case 4 * 60 * 60 * 1000:
        timeRange = 4 * 60 * 60;
        break;
      case 12 * 60 * 60 * 1000:
        timeRange = 12 * 60 * 60;
        break;
      case 24 * 60 * 60 * 1000:
        timeRange = 24 * 60 * 60;
        break;
      case 7 * 24 * 60 * 60 * 1000:
        timeRange = 7 * 24 * 60 * 60;
        break;
      case 30 * 24 * 60 * 60 * 1000:
        timeRange = 30 * 24 * 60 * 60;
        break;
      case 60 * 24 * 60 * 60 * 1000:
        timeRange = 60 * 24 * 60 * 60;
        break;
      default:
        timeRange = -1;
    }
    return timeRange;
  };

  filterData = data => this.reduce(data, 50);

  reduce = (data, maxCount) => {
    if (data.length <= maxCount) return data;
    const blockSize = data.length / maxCount;
    const reduced = [];
    for (let i = 0; i < data.length; ) {
      const chunk = data.slice(i, (i += blockSize) + 1);
      reduced.push(this.average(chunk));
    }
    return reduced;
  };

  average = chunk => {
    let x = 0;
    let y = 0;
    for (let i = 0; i < chunk.length; i++) {
      x += chunk[i].x.getTime();
      y += chunk[i].y;
    }
    return {
      x: new Date(Math.round(x / chunk.length)),
      y: Math.round(y / chunk.length),
    };
  };

  handleElementsClick = elems => {
    if (elems[0] && elems[0]._index)
      console.log(this.chart.data.datasets[0].data[elems[0]._index]);
  };

  handleChangeTimeRange = event => {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - event.target.value * 1000);
    this.props.fireUpDateChange(startDate, endDate);
  };

  handleChangeDateZoom = () => {
    const startDate = new Date(this.chart.scales['x-axis-0'].min);
    const endDate = new Date(this.chart.scales['x-axis-0'].max);
    this.chart.resetZoom();
    this.props.fireUpDateChange(startDate, endDate);
  };

  handleChangeDate = type => date => {
    let { startDate, endDate } = this.props;
    if (type === 'startDate') {
      startDate = date > endDate ? endDate : date;
    } else {
      endDate = date < startDate ? startDate : date;
    }
    this.props.fireUpDateChange(startDate, endDate);
  };

  render() {
    const { data, startDate, endDate } = this.props;
    const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 40%)`;

    return (
      <Card>
        <CardActions>
          <Grid container spacing={24} alignItems="center">
            <Grid item xs={12} md={6}>
              <FormControl>
                <InputLabel htmlFor="time-select">Time</InputLabel>
                <Select
                  value={this.getTimeRange()}
                  onChange={this.handleChangeTimeRange}
                  inputProps={{
                    name: 'time-select',
                    id: 'time-select',
                  }}
                >
                  <MenuItem value={-1} disabled>
                    <em>Custom</em>
                  </MenuItem>
                  <MenuItem value={15 * 60}>Last 15 minutes</MenuItem>
                  <MenuItem value={30 * 60}>Last 30 minutes</MenuItem>
                  <MenuItem value={60 * 60}>Last 1 hour</MenuItem>
                  <MenuItem value={4 * 60 * 60}>Last 4 hours</MenuItem>
                  <MenuItem value={12 * 60 * 60}>Last 12 hours</MenuItem>
                  <MenuItem value={24 * 60 * 60}>Last 1 day</MenuItem>
                  <MenuItem value={7 * 24 * 60 * 60}>Last 7 days</MenuItem>
                  <MenuItem value={30 * 24 * 60 * 60}>Last 30 days</MenuItem>
                  <MenuItem value={60 * 24 * 60 * 60}>Last 60 days</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <DateTimePicker
                      margin="normal"
                      label="Start Date"
                      value={startDate}
                      format="MMMM, dd, yyyy, HH:mm"
                      onChange={this.handleChangeDate('startDate')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePicker
                      margin="normal"
                      label="End Date"
                      value={endDate}
                      format="MMMM, dd, yyyy, HH:mm"
                      onChange={this.handleChangeDate('endDate')}
                    />
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </CardActions>
        <CardContent>
          <Bar
            ref={reference => (this.chartReference = reference)}
            data={{
              datasets: [
                {
                  backgroundColor: color,
                  data: this.filterData(data),
                },
              ],
            }}
            onElementsClick={this.handleElementsClick}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              legend: {
                display: false,
              },
              scales: {
                xAxes: [
                  {
                    type: 'time',
                    display: true,
                    distribution: 'series',
                  },
                ],
              },
              zoom: {
                enabled: true,
                drag: true,
                mode: 'x',
                onZoom: () => {
                  this.handleChangeDateZoom();
                },
              },
            }}
          />
        </CardContent>
      </Card>
    );
  }
}

BarChartCore.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BarChartCore);
