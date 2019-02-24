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

let sample = { "date": "22-Feb-2019", "time": "16:01:00.812", "c_ip": "192.168.0.57", "c_port": "47086", "query_name": "ocsp.digicert.com", "query_class": "IN", "query_type": "AAAA", "query_flags": "+" };

class TableDiscover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data.dnsData,
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
    console.log(data.dnsData);
    const curData = this.handleData(startDate, endDate);
    console.log(curData);
    // console.log(this.state.data);

    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title="DNS Logs"
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
