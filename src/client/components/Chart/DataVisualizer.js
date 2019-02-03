import React, { Component } from 'react';
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
import LinearProgress from '@material-ui/core/LinearProgress';

import { connect } from 'react-redux';
import { dateRangeActions } from '_actions';

function DataVisualizer(Chart) {
  function yourFunction(...props) {
    // console.log('in your func');
    // console.log(props);
    const _fourHours = 1000 * 60 * 60 * 4;
    const _filterData = data => _reduce(data, 50);
    const _reduce = (data, maxCount) => {
      if (data.length <= maxCount) return data;
      const blockSize = data.length / maxCount;
      const reduced = [];
      for (let i = 0; i < data.length;) {
        const chunk = data.slice(i, (i += blockSize) + 1);
        reduced.push(_average(chunk));
      }
      return reduced;
    };
    const _average = chunk => {
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
    const SubComponent = class extends Component {
      constructor(props) {
        super(props);
        // console.log('??wtf');
        // console.log(props);

        this.state = {
          startDate: null,
          endDate: null,
          data: props.data,
          loading: true,
          useTR: true,
        };
      }

      componentDidMount() {
        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - _fourHours);
        this.handleDateRangeChange(startDate, endDate);
      }

      getTimeRange = () => {
        if (this.state.useTR === false) return -1;
        let timeRange;
        const { startDate, endDate } = this.state;
        switch (endDate.getTime() - startDate.getTime()) {
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

      handleDateRangeChange = (startDate, endDate) => {
        this.setState({
          loading: true,
        }, () => {
          const { data, opened } = this.props;
          // console.log('in HandleDateRangeChange');
          opened({ startDate, endDate });
          const newData = data.filter(curData => {
            if (
              curData.x.getTime() >= startDate.getTime() &&
              curData.x.getTime() <= endDate.getTime()
            ) {
              return true;
            }
            return false;
          });
          this.setState({
            startDate,
            endDate,
            data: _filterData(newData),
            loading: false,
          });
        });
      };

      handleChangeTimeRange = event => {
        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - event.target.value * 1000);
        this.setState({
          useTR: true,
        }, () => {
          this.handleDateRangeChange(startDate, endDate);
        });
      };

      handleDateChange = type => date => {
        let { startDate, endDate } = this.state;
        if (type === 'startDate') {
          startDate = date > endDate ? endDate : date;
        } else {
          endDate = date < startDate ? startDate : date;
        }
        this.setState({
          useTR: false,
        }, () => {
          this.handleDateRangeChange(startDate, endDate);
        });
      };

      render() {
        const { startDate, endDate, data, loading } = this.state;
        const { color } = this.props;
        if (startDate !== null && endDate !== null) {
          return (
            <Card
              style={{
                borderRadius: 10,
                border: 0,
                color: 'white',
                padding: '0 3px',
                margin: '5px',
                boxShadow: '0 3px 5px 2px #cccccc',
              }}
            >
              <CardActions>
                <Grid container spacing={24} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <FormControl>
                      <InputLabel htmlFor="time-select">Chọn nhanh</InputLabel>
                      <Select
                        disabled={loading}
                        value={this.getTimeRange()}
                        onChange={this.handleChangeTimeRange}
                        inputProps={{
                          name: 'time-select',
                          id: 'time-select',
                        }}
                      >
                        <MenuItem value={-1} disabled>
                          <em>Tuỳ chỉnh</em>
                        </MenuItem>
                        <MenuItem value={15 * 60}>15 phút trước</MenuItem>
                        <MenuItem value={30 * 60}>30 phút trước</MenuItem>
                        <MenuItem value={60 * 60}>1 giờ trước</MenuItem>
                        <MenuItem value={4 * 60 * 60}>4 giờ trước</MenuItem>
                        <MenuItem value={12 * 60 * 60}>12 giờ trước</MenuItem>
                        <MenuItem value={24 * 60 * 60}>1 ngày trước</MenuItem>
                        <MenuItem value={7 * 24 * 60 * 60}>
                          7 ngày trước
                        </MenuItem>
                        <MenuItem value={30 * 24 * 60 * 60}>
                          30 ngày trước
                        </MenuItem>
                        <MenuItem value={60 * 24 * 60 * 60}>
                          60 ngày trước
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container spacing={24}>
                        <Grid item xs={6}>
                          <DateTimePicker
                            disabled={loading}
                            margin="normal"
                            label="Ngày bắt đầu"
                            value={startDate}
                            format="MMMM, dd, yyyy, HH:mm"
                            onChange={this.handleDateChange('startDate')}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <DateTimePicker
                            disabled={loading}
                            margin="normal"
                            label="Ngày kết thúc"
                            value={endDate}
                            format="MMMM, dd, yyyy, HH:mm"
                            onChange={this.handleDateChange('endDate')}
                          />
                        </Grid>
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
              </CardActions>
              <CardContent>
                {loading ? (<LinearProgress />) : (
                  <Chart
                    data={data}
                    startDate={startDate}
                    endDate={endDate}
                    fireUpDateRangeChange={this.handleDateRangeChange}
                    color={color}
                  />  
                )}
              </CardContent>
            </Card>
          );
        } else {
          return (<LinearProgress />);
        }
      }
    };
    return <SubComponent {...props[0]} />;
  }
  return connect(
    null,
    mapDispatchToProps
  )(yourFunction);
}

const mapDispatchToProps = dispatch => ({
  opened: newStatus => {
    dispatch(dateRangeActions.changeDateRange(newStatus));
  },
});

export default DataVisualizer;
