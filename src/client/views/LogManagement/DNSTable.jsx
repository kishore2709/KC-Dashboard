import React from 'react';
import MUIDataTable from 'mui-datatables';
import withStyles from '@material-ui/core/styles/withStyles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import momentRandom from 'moment-random';
import { connect } from 'react-redux';
import { dateRangeActions } from '_actions';
import moment from 'moment';
import { makePdf, MakeExcel } from '_helpers/Utils/';
// icon
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
//

// import data from '_helpers/Utils/genChartData.js';

const sample = {
  date: '22-Feb-2019',
  time: '16:01:00.812',
  c_ip: '192.168.0.57',
  c_port: '47086',
  query_name: 'ocsp.digicert.com',
  query_class: 'IN',
  query_type: 'AAAA',
  query_flags: '+',
};

const dnsData = [
  {
    date: '22-Feb-2019',
    time: '16:01:00.812',
    c_ip: '192.168.0.57',
    c_port: '47086',
    query_name: 'ocsp.digicert.com',
    query_class: 'IN',
    query_type: 'AAAA',
    query_flags: '+',
  },
  {
    date: '22-Feb-2019',
    time: '16:01:55.857',
    c_ip: '192.168.0.57',
    c_port: '52956',
    query_name: 'incoming.telemetry.mozilla.org',
    query_class: 'IN',
    query_type: 'A',
    query_flags: '+',
  },
  {
    date: '22-Feb-2019',
    time: '16:01:55.857',
    c_ip: '192.168.0.57',
    c_port: '52956',
    query_name: 'incoming.telemetry.mozilla.org',
    query_class: 'IN',
    query_type: 'AAAA',
    query_flags: '+',
  },
  {
    date: '22-Feb-2019',
    time: '16:01:56.138',
    c_ip: '192.168.0.57',
    c_port: '43270',
    query_name: 'incoming.telemetry.mozilla.org',
    query_class: 'IN',
    query_type: 'A',
    query_flags: '+T',
  },
  {
    date: '22-Feb-2019',
    time: '16:01:56.240',
    c_ip: '192.168.0.57',
    c_port: '43270',
    query_name: 'incoming.telemetry.mozilla.org',
    query_class: 'IN',
    query_type: 'AAAA',
    query_flags: '+T',
  },
  {
    date: '22-Feb-2019',
    time: '16:01:56.290',
    c_ip: '192.168.0.57',
    c_port: '43209',
    query_name: 'detectportal.firefox.com',
    query_class: 'IN',
    query_type: 'A',
    query_flags: '+',
  },
  {
    date: '22-Feb-2019',
    time: '16:01:56.290',
    c_ip: '192.168.0.57',
    c_port: '43209',
    query_name: 'detectportal.firefox.com',
    query_class: 'IN',
    query_type: 'AAAA',
    query_flags: '+',
  },
  {
    date: '22-Feb-2019',
    time: '16:09:40.007',
    c_ip: '192.168.0.57',
    c_port: '33671',
    query_name: 'jmeter-plugins.org',
    query_class: 'IN',
    query_type: 'A',
    query_flags: '+',
  },
  {
    date: '22-Feb-2019',
    time: '16:09:40.007',
    c_ip: '192.168.0.57',
    c_port: '33671',
    query_name: 'jmeter-plugins.org',
    query_class: 'IN',
    query_type: 'AAAA',
    query_flags: '+',
  },
  {
    date: '22-Feb-2019',
    time: '16:15:46.988',
    c_ip: '192.168.0.66',
    c_port: '48730',
    query_name: 'api.twitter.com',
    query_class: 'IN',
    query_type: 'A',
    query_flags: '-',
  },
  {
    date: '22-Feb-2019',
    time: '16:15:48.020',
    c_ip: '192.168.0.66',
    c_port: '48730',
    query_name: 'api.twitter.com',
    query_class: 'IN',
    query_type: 'A',
    query_flags: '-',
  },
  {
    date: '22-Feb-2019',
    time: '16:15:49.545',
    c_ip: '192.168.0.66',
    c_port: '48730',
    query_name: 'api.twitter.com',
    query_class: 'IN',
    query_type: 'A',
    query_flags: '-',
  },
  {
    date: '22-Feb-2019',
    time: '16:15:49.732',
    c_ip: '192.168.0.66',
    c_port: '36167',
    query_name: 'api.twitter.com',
    query_class: 'IN',
    query_type: 'A',
    query_flags: '-',
  },
  {
    date: '22-Feb-2019',
    time: '16:15:50.984',
    c_ip: '192.168.0.66',
    c_port: '48730',
    query_name: 'api.twitter.com',
    query_class: 'IN',
    query_type: 'A',
    query_flags: '-',
  },
  {
    date: '22-Feb-2019',
    time: '16:15:51.380',
    c_ip: '192.168.0.66',
    c_port: '40166',
    query_name: 'api.twitter.com',
    query_class: 'IN',
    query_type: 'A',
    query_flags: '-',
  },
  {
    date: '22-Feb-2019',
    time: '16:15:52.013',
    c_ip: '192.168.0.66',
    c_port: '48730',
    query_name: 'api.twitter.com',
    query_class: 'IN',
    query_type: 'A',
    query_flags: '-',
  },
  {
    date: '22-Feb-2019',
    time: '16:15:52.025',
    c_ip: '192.168.0.66',
    c_port: '40166',
    query_name: 'api.twitter.com',
    query_class: 'IN',
    query_type: 'A',
    query_flags: '-',
  },
  {
    date: '22-Feb-2019',
    time: '16:15:52.043',
    c_ip: '192.168.0.66',
    c_port: '35620',
    query_name: 'api.twitter.com',
    query_class: 'IN',
    query_type: 'A',
    query_flags: '-',
  },
  {
    date: '22-Feb-2019',
    time: '16:15:52.123',
    c_ip: '192.168.0.66',
    c_port: '36167',
    query_name: 'api.twitter.com',
    query_class: 'IN',
    query_type: 'A',
    query_flags: '-',
  },
  {
    date: '22-Feb-2019',
    time: '16:15:52.160',
    c_ip: '192.168.0.66',
    c_port: '35620',
    query_name: 'api.twitter.com',
    query_class: 'IN',
    query_type: 'A',
    query_flags: '-',
  },
].map(val => Object.values(val));

class DNSTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dnsData,
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
        customBodyRender: data => (
          // console.log(data);
          <Typography style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {data}
          </Typography>
        ),
      },
    }));

    // console.log(genDataTable);
    // const data = genDataTable;
    const { startDate, endDate } = this.props.dateRange.message;
    let curData = [];
    // setTimeout(() => {
    console.log(dnsData);
    console.log(this.state.data);
    curData = this.handleData(startDate, endDate);
    // }, 3000);
    console.log('dns data...');
    console.log(curData);
    // console.log(this.props.chartImageURL);
    // if (startDate != '') console.log(moment(startDate));
    // console.log('test..', moment("22-Feb-2019"))
    const options = {
      filterType: 'dropdown',
      responsive: 'scroll',
      selectableRows: false,
      filter: false,
      viewColumns: false,
      sort: false,
      textLabels: {
        body: {
          noMatch: 'Hiện tại chưa có dữ liệu',
          toolTip: 'Sắp xếp',
        },
        pagination: {
          next: 'Trang tiếp',
          previous: 'Trang trước',
          rowsPerPage: 'Số dòng mỗi trang',
          displayRows: 'của',
        },
        toolbar: {
          search: 'Tìm kiếm',
          downloadCsv: 'Xuất bản dạng CSV',
          print: 'Xuất bản ra máy in',
          viewColumns: 'Bộ lọc cột',
          filterTable: 'Bộ lọc bảng',
        },
        filter: {
          all: 'Tất cả',
          title: 'Bộ lọc',
          reset: 'Làm lại',
        },
        viewColumns: {
          title: 'Hiển thị cột',
          titleAria: 'Ẩn/hiện bảng các cột',
        },
        selectedRows: {
          text: 'cột đã được chọn',
          delete: 'Xóa',
          deleteAria: 'Xóa cột đã chọn',
        },
      },
      customToolbar: () => (
        <React.Fragment>
          <Tooltip title="Xuất bản dạng PDF">
            <IconButton
              aria-label="Xuất bản PDF"
              onClick={() => {
                makePdf(
                  `Báo cáo kết quả phân tích dữ liệu DNS ${
                    startDate
                      ? `từ ${moment(startDate).format('DD-MM-YYYY')} `
                      : ''
                  } ${
                    endDate ? `đến ${moment(endDate).format('DD-MM-YYYY')}` : ''
                  }`,
                  JSON.parse(JSON.stringify(columns)),
                  JSON.parse(JSON.stringify(curData)),
                  true,
                  'A3'
                );
              }}
            >
              <ArrowDownward />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      ),
    };
    // console.log('handle data');
    // console.log(this.handleData(startDate, endDate));
    // console.log(data.dnsData);
    // console.log(curData);
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

export default connect(mapStateToProps)(DNSTable);
