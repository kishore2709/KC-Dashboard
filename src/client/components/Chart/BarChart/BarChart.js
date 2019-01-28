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
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
});

class BarChart extends Component {

  chartReference = {};
  chart = {};
  originalDatasets = [];
  colorSet = ['#e27d60', '#85dcb0', '#daad86', '#c38d9e', '#41b3a3', '#8ee4af', '#557a95'];

  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      timeRange: 15 * 60,
    }
  }

  componentDidMount() {
    this.chart = this.chartReference.chartInstance;
    this.chart.options.pan.rangeMin.x = this.chart.scales["x-axis-0"].min.valueOf() - 1000 * 60 * 60 * 24 * 30;
    this.chart.options.pan.rangeMax.x = this.chart.scales["x-axis-0"].max.valueOf() + 1000 * 60 * 60 * 24 * 30;
    this.chart.options.zoom.rangeMin.x = 1000 * 60 * 60;
    this.handleChartUpdate();
    const endDate = new Date();
    const startDate = new Date(endDate.valueOf() - 15 * 60 * 1000);
    this.setState({
      startDate: startDate,
      endDate: endDate,
    });
  }

  componentDidUpdate() {
    this.handleChartUpdate();
  }

  handleChartUpdate = () => {
    this.filterData(this.chart);
    this.chart.update();
  }

  filterData = (chart) => {
    var maxRenderedPointsX = 100;
    var datasets = chart.data.datasets;
    if (this.originalDatasets.length === 0) {
      for (var i in datasets) {
        this.originalDatasets.push(datasets[i].data);
      }
    }
    var startX = chart.scales["x-axis-0"].min;
    var endX = chart.scales["x-axis-0"].max;
  
    for (var i = 0; i < this.originalDatasets.length; i++) {
      var originalData = this.originalDatasets[i];
  
      if (originalData.length === 0)
        continue;
  
      var firstElement = {index: 0, time: null};
      var lastElement = {index: originalData.length - 1, time: null};
  
      for (var j = 0; j < originalData.length; j++) {
        var time = originalData[j].x;
        if (time >= startX && (firstElement.time === null || time < firstElement.time)) {
          firstElement.index = j;
          firstElement.time = time;
        }
        if (time <= endX && (lastElement.time === null || time > lastElement.time)) {
          lastElement.index = j;
          lastElement.time = time;
        }
      }
      var startIndex = firstElement.index <= lastElement.index ? firstElement.index : lastElement.index;
      var endIndex = firstElement.index >= lastElement.index ? firstElement.index : lastElement.index;
      datasets[i].data = this.reduce(originalData.slice(startIndex, endIndex + 1), maxRenderedPointsX);
    }
  }
  
  reduce = (data, maxCount) => {
    if (data.length <= maxCount)
      return data;
    var blockSize = data.length / maxCount;
    var reduced = [];
    for (var i = 0; i < data.length;) {
      var chunk = data.slice(i, (i += blockSize) + 1);
      reduced.push(this.average(chunk));
    }
    return reduced;
  }
  
  average = (chunk) => {
    var x = chunk[0].x;
    var y = 0;
    for (var i = 0; i < chunk.length; i++) {
      y += chunk[i].y;
    }
    return {x: x, y: Math.round(y / chunk.length)};
  }

  handleElementsClick = elems => {
    if (elems[0] && elems[0]._index) console.log(this.chart.data.datasets[0].data[elems[0]._index]);
  }

  handleChangeTimeRange = event => {
    const timeRange = event.target.value;
    const endDate = new Date();
    const startDate = new Date(endDate.valueOf() - timeRange * 1000);
    this.setState({ 
      startDate: startDate, 
      endDate: endDate, 
      timeRange: timeRange,
    });
  }

  handleChangeDate = type => date => {
    let { startDate, endDate } = this.state;
    if (type === 'startDate') {
      startDate = date > endDate ? endDate : date;
    } else {
      endDate = date < startDate ? startDate : date;
    }
    this.setState({
      startDate: startDate,
      endDate: endDate,
      timeRange: -1,
    })
  }

  render() {

    const { data } = this.props;
    const color = this.colorSet[Math.floor(Math.random() * this.colorSet.length)];
    const { startDate, endDate, timeRange } = this.state;

    return(
      <Card>
        <CardActions>
          <Grid
            container
            spacing={24}
            alignItems='center'
          >
            <Grid
              item
              xs={12}
              md={6}
            >
              <FormControl>
                <InputLabel htmlFor="time-select">Time</InputLabel>
                <Select
                  value={timeRange}
                  onChange={this.handleChangeTimeRange}
                  inputProps={{
                    name: 'time-select',
                    id: 'time-select',
                  }}
                >
                  <MenuItem value={-1}>
                    <em>Custom</em>
                  </MenuItem>
                  <MenuItem value={15 * 60}>Last 15 minutes</MenuItem>
                  <MenuItem value={30 * 60}>Last 30 minutes</MenuItem>
                  <MenuItem value={60 * 60}>Last 1 hour</MenuItem>
                  <MenuItem value={4 * 60 * 60}>Last 4 hours</MenuItem>
                  <MenuItem value={12 * 60 *60}>Last 12 hours</MenuItem>
                  <MenuItem value={24 * 60 * 60}>Last 1 day</MenuItem>
                  <MenuItem value={7 * 24 * 60 * 60}>Last 7 days</MenuItem>
                  <MenuItem value={30 * 24 * 60 * 60}>Last 30 days</MenuItem>
                  <MenuItem value={60 * 24 * 60 * 60}>Last 60 days</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
              <MuiPickersUtilsProvider 
                utils={DateFnsUtils}
              >
                <Grid 
                  container
                  spacing={24}
                >
                  <Grid
                    item
                    xs={6}
                  >
                    <DatePicker
                      margin="normal"
                      label="Start Date"
                      value={startDate}
                      onChange={this.handleChangeDate('startDate')}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                  >
                    <DatePicker
                      margin="normal"
                      label="End Date"
                      value={endDate}
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
            ref={ (reference) => this.chartReference = reference }
            data={{
              datasets: [{
                label: 'Data',
                backgroundColor: color,
                data: data,
              }],
            }}
            onElementsClick={this.handleElementsClick}
            options={{
              maintainAspectRatio: true,
              responsive: true,
              legend: {
                display: false,
              },
              scales: {
                xAxes: [{
                  type: 'time',
                  display: true,
                }]
              },
              zoom: {
                enabled: true,
                mode: 'x',
                rangeMin: {},
                rangeMax: {},
                onZoom: this.handleChartUpdate,
              },
              pan: {
                enabled: true,
                mode: 'x',
                rangeMin: {},
                rangeMax: {},
                onPan: this.handleChartUpdate,
              },
              
            }}
          />
        </CardContent>
      </Card>
    );
  }
}

BarChart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BarChart);