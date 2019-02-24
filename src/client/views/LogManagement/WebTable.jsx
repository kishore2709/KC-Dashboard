import React from 'react';
import MUIDataTable from 'mui-datatables';
import withStyles from '@material-ui/core/styles/withStyles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import momentRandom from 'moment-random';
import { connect } from 'react-redux';
import { dateRangeActions } from '_actions';
import moment from 'moment';
import data from '_helpers/Utils/genChartData.js';

let sample = { "date": "2019-02-22", "time": "09:16:49", "s_sitename": "W3SVC1", "s_computername": "WIN2008R2-TEST", "server_ip": "192.168.0.52", "cs_method": "GET", "cs_uri_stem": "/", "cs_uri_query": "-", "s_port": "80", "cs_username": "-", "c_ip": "192.168.0.66", "cs_version": "HTTP/1.1", "cs_User_Agent": "Apache-HttpClient/4.5.5+(Java/1.8.0_191)", "cs_cookie": "-", "cs_referer": "-", "cs_host": "192.168.0.52", "sc_status": "200", "sc_substatus": "0", "sc_win32_status": "0", "sc_bytes": "936", "cs_bytes": "116", "time_taken": "10" };

 
class TableDiscover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data.webData,
    };
    this.handleData = this.handleData.bind(this);
  }

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          root: {
            backgroundColor: '#021608',
          },
        },
      },
    });

  handleData(startDate, endDate) {
    if (startDate != '')
      return this.state.data.filter(
        val =>
          moment(startDate) <= moment(val[0]) &&
          moment(val[0]) <= moment(endDate)
      );
    return this.state.data;
  }

  render() {
    // console.log(this.props.dateRange);
    const columns = Object.keys(sample).map(val => ({
      name: val,
      options: {
        filter: true,
        customBodyRender: data => <Typography style={{ overflow: 'hidden', textOverflow: 'ellipsis', }}>{data}</Typography>,
      },
    }))

    // console.log(genDataTable);
    // const data = genDataTable;
    const { startDate, endDate } = this.props.dateRange.message;
    // if (startDate != '') console.log(moment(startDate));
    // console.log('test..', moment("22-Feb-2019"))
    const options = {
      filterType: 'dropdown',
      responsive: 'scroll',
      selectableRows: false,
      filter: true,
    };
    // console.log('handle data');
    // console.log(this.handleData(startDate, endDate));
    // console.log(data.dnsData);
    const curData = this.handleData(startDate, endDate);
    // console.log(curData);
    // console.log(this.state.data);

    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title="Web Logs"
          data={curData}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  const { dateRange } = state;
  return {
    dateRange,
  };
}

export default connect(mapStateToProps)(TableDiscover);
