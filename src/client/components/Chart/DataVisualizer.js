import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import Loading from 'components/Loading/Loading';

import { connect } from 'react-redux';
import { dateRangeActions } from '_actions';
import { chartActions } from '_actions';

function DataVisualizer(Chart) {
  function yourFunction(...props) {
    // console.log('in your func');
    // console.log(props);
    const _fourHours = 1000 * 60 * 60 * 4;
    /*
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
    */
    const _color = ['red', 'blue', 'green', 'orange', 'black'];
    // eslint-disable-next-line react/display-name
    const SubComponent = class extends Component {
      constructor(props) {
        super(props);
        // console.log('??wtf');
        // console.log(props);

        this.state = {
          // startDate: null,
          // endDate: null,
          // data: [],
          // loading: true,
          useTR: true,
          dataShow: [],
          // allDataLabel: [],
        };
      }

      componentDidMount() {
        this.setState({
          dataShow: this.props.allDataLabel,
        });
        /*
        if (!Array.isArray(this.props.data)) return;
        const allDataLabel = this.props.data.filter(dataRow => dataRow.label && Array.isArray(dataRow.data)).map(dataRow => dataRow.label);
        this.setState({
          allDataLabel: allDataLabel,
          dataShow: allDataLabel,
        }, () => {
          
          const endDate = new Date();
          const startDate = new Date(endDate.getTime() - _fourHours);
          this.handleDateRangeChange(startDate, endDate);
          // console.log(allDataLabel);
        });
        */
      }

      getTimeRange = () => {
        if (this.state.useTR === false) return -1;
        let timeRange;
        const { startDate, endDate } = this.props;
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
        this.props.fireUpDateRangeChange(startDate, endDate);
        /*
        this.setState(
          {
            loading: true,
          },
          () => {  
            if (!Array.isArray(this.props.data)) return;
            const { data, opened } = this.props;
            opened({ startDate, endDate });
            const newData = data
              .filter(dataRow => dataRow.label && Array.isArray(dataRow.data))
              .filter(dataRow => this.state.dataShow.includes(dataRow.label))
              .map(dataRow => ({
                label: dataRow.label,
                data: _filterData(
                  dataRow.data.filter(curData => {
                    if (
                      curData.x.getTime() >= startDate.getTime() &&
                      curData.x.getTime() <= endDate.getTime()
                    ) {
                      return true;
                    }
                    return false;
                  })
                ),
              }));
            
            if (this.props.fireUpDateRangeChange && {}.toString.call(this.props.fireUpDateRangeChange) === '[object Function]') {
              this.props.fireUpDateRangeChange(startDate, endDate);
            }
            this.setState({
              startDate,
              endDate,
              data: newData,
              loading: false,
            });
          }
        );
        */
      };

      handleImageURL = dataURL => {
        const { addChartImageURL } = this.props;
        addChartImageURL(dataURL);
      };

      handleChangeTimeRange = event => {
        const endDate = new Date();
        const startDate = new Date(
          endDate.getTime() - event.target.value * 1000
        );
        this.handleDateRangeChange(startDate, endDate);
      };

      handleDateChange = type => date => {
        let { startDate, endDate } = this.props;
        if (type === 'startDate') {
          startDate = date > endDate ? endDate : date;
        } else {
          endDate = date < startDate ? startDate : date;
        }
        this.handleDateRangeChange(startDate, endDate);
      };

      handleDataShowChange = event => {
        this.setState(
          {
            dataShow: event.target.value,
          }
          /*
          () => {
            this.handleDateRangeChange(
              this.state.startDate,
              this.state.endDate
            );
          }
          */
        );
      };

      render() {
        const { startDate, endDate, loading, allDataLabel } = this.props;
        const { dataShow } = this.state;
        // console.log(this.state);
        if (loading) return <Loading />;
        const { color, height } = this.props;
        let chartHeight;
        if (height) chartHeight = height;
        else chartHeight = 'auto';
        if (startDate !== null && endDate !== null) {
          return (
            <Card
              style={{
                width: '100%',
                borderRadius: 10,
                border: 0,
                color: 'white',
                padding: '0',
                margin: '0',
                boxShadow: '0 3px 5px 2px #cccccc',
              }}
            >
              <CardActions style={{ padding: '1px 4px' }}>
                <Grid container spacing={8} alignItems="center">
                  <Grid item xs={12} md={3}>
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
                  <Grid item xs={12} md={3}>
                    <FormControl>
                      <InputLabel htmlFor="select-mutiple-checkbox">
                        Dữ liệu
                      </InputLabel>
                      <Select
                        style={{
                          width: '180px',
                          overflow: 'auto',
                          textOverflow: 'ellipse',
                        }}
                        multiple
                        value={this.state.dataShow}
                        onChange={this.handleDataShowChange}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(', ')}
                        disabled={loading}
                      >
                        {allDataLabel.map(label => (
                          <MenuItem key={label} value={label}>
                            <Checkbox
                              checked={this.state.dataShow.includes(label)}
                            />
                            <ListItemText primary={label} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container spacing={8}>
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
              <CardContent style={{ height: chartHeight }}>
                {loading ? (
                  <LinearProgress />
                ) : (
                  <Chart
                    disabled={loading}
                    data={this.props.data}
                    startDate={startDate}
                    endDate={endDate}
                    fireUpDateRangeChange={this.handleDateRangeChange}
                    color={_color}
                    dataShow={dataShow}
                    fireUpImageURL={this.handleImageURL}
                  />
                )}
              </CardContent>
            </Card>
          );
        }
        return <LinearProgress />;
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
  addChartImageURL: dataURL => {
    dispatch(chartActions.addChartImageURL(dataURL));
  },
});

export default DataVisualizer;
