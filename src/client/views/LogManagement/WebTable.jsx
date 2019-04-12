import React from 'react';
import MUIDataTable from 'mui-datatables';
import withStyles from '@material-ui/core/styles/withStyles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import momentRandom from 'moment-random';
import { connect } from 'react-redux';
import { dateRangeActions } from '_actions';
import moment from 'moment';
import data from '_helpers/Utils/genChartData.js';
import { makePdf } from '_helpers/Utils/';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Loading from 'components/Loading/Loading.jsx';

const sample = {
  date: '2019-02-22',
  time: '09:16:49',
  s_sitename: 'W3SVC1',
  s_computername: 'WIN2008R2-TEST',
  server_ip: '192.168.0.52',
  cs_method: 'GET',
  cs_uri_stem: '/',
  cs_uri_query: '-',
  s_port: '80',
  cs_username: '-',
  c_ip: '192.168.0.66',
  cs_version: 'HTTP/1.1',
  cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
  cs_cookie: '-',
  cs_referer: '-',
  cs_host: '192.168.0.52',
  sc_status: '200',
  sc_substatus: '0',
  sc_win32_status: '0',
  sc_bytes: '936',
  cs_bytes: '116',
  time_taken: '10',
};

const webData = [
  {
    date: '2019-02-22',
    time: '09:16:49',
    s_sitename: 'W3SVC1',
    s_computername: 'WIN2008R2-TEST',
    server_ip: '192.168.0.52',
    cs_method: 'GET',
    cs_uri_stem: '/',
    cs_uri_query: '-',
    s_port: '80',
    cs_username: '-',
    c_ip: '192.168.0.66',
    cs_version: 'HTTP/1.1',
    cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
    cs_cookie: '-',
    cs_referer: '-',
    cs_host: '192.168.0.52',
    sc_status: '200',
    sc_substatus: '0',
    sc_win32_status: '0',
    sc_bytes: '936',
    cs_bytes: '116',
    time_taken: '10',
  },
  {
    date: '2019-02-22',
    time: '09:16:49',
    s_sitename: 'W3SVC1',
    s_computername: 'WIN2008R2-TEST',
    server_ip: '192.168.0.52',
    cs_method: 'GET',
    cs_uri_stem: '/',
    cs_uri_query: '-',
    s_port: '80',
    cs_username: '-',
    c_ip: '192.168.0.66',
    cs_version: 'HTTP/1.1',
    cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
    cs_cookie: '-',
    cs_referer: '-',
    cs_host: '192.168.0.52',
    sc_status: '200',
    sc_substatus: '0',
    sc_win32_status: '0',
    sc_bytes: '936',
    cs_bytes: '116',
    time_taken: '10',
  },
  {
    date: '2019-02-22',
    time: '09:16:49',
    s_sitename: 'W3SVC1',
    s_computername: 'WIN2008R2-TEST',
    server_ip: '192.168.0.52',
    cs_method: 'GET',
    cs_uri_stem: '/',
    cs_uri_query: '-',
    s_port: '80',
    cs_username: '-',
    c_ip: '192.168.0.66',
    cs_version: 'HTTP/1.1',
    cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
    cs_cookie: '-',
    cs_referer: '-',
    cs_host: '192.168.0.52',
    sc_status: '200',
    sc_substatus: '0',
    sc_win32_status: '0',
    sc_bytes: '936',
    cs_bytes: '116',
    time_taken: '11',
  },
  {
    date: '2019-02-22',
    time: '09:16:50',
    s_sitename: 'W3SVC1',
    s_computername: 'WIN2008R2-TEST',
    server_ip: '192.168.0.52',
    cs_method: 'GET',
    cs_uri_stem: '/',
    cs_uri_query: '-',
    s_port: '80',
    cs_username: '-',
    c_ip: '192.168.0.66',
    cs_version: 'HTTP/1.1',
    cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
    cs_cookie: '-',
    cs_referer: '-',
    cs_host: '192.168.0.52',
    sc_status: '200',
    sc_substatus: '0',
    sc_win32_status: '0',
    sc_bytes: '936',
    cs_bytes: '116',
    time_taken: '9',
  },
  {
    date: '2019-02-22',
    time: '09:16:50',
    s_sitename: 'W3SVC1',
    s_computername: 'WIN2008R2-TEST',
    server_ip: '192.168.0.52',
    cs_method: 'GET',
    cs_uri_stem: '/',
    cs_uri_query: '-',
    s_port: '80',
    cs_username: '-',
    c_ip: '192.168.0.66',
    cs_version: 'HTTP/1.1',
    cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
    cs_cookie: '-',
    cs_referer: '-',
    cs_host: '192.168.0.52',
    sc_status: '200',
    sc_substatus: '0',
    sc_win32_status: '0',
    sc_bytes: '936',
    cs_bytes: '116',
    time_taken: '10',
  },
  {
    date: '2019-02-22',
    time: '09:16:50',
    s_sitename: 'W3SVC1',
    s_computername: 'WIN2008R2-TEST',
    server_ip: '192.168.0.52',
    cs_method: 'GET',
    cs_uri_stem: '/',
    cs_uri_query: '-',
    s_port: '80',
    cs_username: '-',
    c_ip: '192.168.0.66',
    cs_version: 'HTTP/1.1',
    cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
    cs_cookie: '-',
    cs_referer: '-',
    cs_host: '192.168.0.52',
    sc_status: '200',
    sc_substatus: '0',
    sc_win32_status: '0',
    sc_bytes: '936',
    cs_bytes: '116',
    time_taken: '10',
  },
  {
    date: '2019-02-22',
    time: '09:16:50',
    s_sitename: 'W3SVC1',
    s_computername: 'WIN2008R2-TEST',
    server_ip: '192.168.0.52',
    cs_method: 'GET',
    cs_uri_stem: '/',
    cs_uri_query: '-',
    s_port: '80',
    cs_username: '-',
    c_ip: '192.168.0.66',
    cs_version: 'HTTP/1.1',
    cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
    cs_cookie: '-',
    cs_referer: '-',
    cs_host: '192.168.0.52',
    sc_status: '200',
    sc_substatus: '0',
    sc_win32_status: '0',
    sc_bytes: '936',
    cs_bytes: '116',
    time_taken: '10',
  },
  {
    date: '2019-02-22',
    time: '09:16:50',
    s_sitename: 'W3SVC1',
    s_computername: 'WIN2008R2-TEST',
    server_ip: '192.168.0.52',
    cs_method: 'GET',
    cs_uri_stem: '/',
    cs_uri_query: '-',
    s_port: '80',
    cs_username: '-',
    c_ip: '192.168.0.66',
    cs_version: 'HTTP/1.1',
    cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
    cs_cookie: '-',
    cs_referer: '-',
    cs_host: '192.168.0.52',
    sc_status: '200',
    sc_substatus: '0',
    sc_win32_status: '0',
    sc_bytes: '936',
    cs_bytes: '116',
    time_taken: '10',
  },
  {
    date: '2019-02-22',
    time: '09:16:50',
    s_sitename: 'W3SVC1',
    s_computername: 'WIN2008R2-TEST',
    server_ip: '192.168.0.52',
    cs_method: 'GET',
    cs_uri_stem: '/',
    cs_uri_query: '-',
    s_port: '80',
    cs_username: '-',
    c_ip: '192.168.0.66',
    cs_version: 'HTTP/1.1',
    cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
    cs_cookie: '-',
    cs_referer: '-',
    cs_host: '192.168.0.52',
    sc_status: '200',
    sc_substatus: '0',
    sc_win32_status: '0',
    sc_bytes: '936',
    cs_bytes: '116',
    time_taken: '11',
  },
  {
    date: '2019-02-22',
    time: '09:16:50',
    s_sitename: 'W3SVC1',
    s_computername: 'WIN2008R2-TEST',
    server_ip: '192.168.0.52',
    cs_method: 'GET',
    cs_uri_stem: '/',
    cs_uri_query: '-',
    s_port: '80',
    cs_username: '-',
    c_ip: '192.168.0.66',
    cs_version: 'HTTP/1.1',
    cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
    cs_cookie: '-',
    cs_referer: '-',
    cs_host: '192.168.0.52',
    sc_status: '200',
    sc_substatus: '0',
    sc_win32_status: '0',
    sc_bytes: '936',
    cs_bytes: '116',
    time_taken: '9',
  },
  {
    date: '2019-02-22',
    time: '09:16:50',
    s_sitename: 'W3SVC1',
    s_computername: 'WIN2008R2-TEST',
    server_ip: '192.168.0.52',
    cs_method: 'GET',
    cs_uri_stem: '/',
    cs_uri_query: '-',
    s_port: '80',
    cs_username: '-',
    c_ip: '192.168.0.66',
    cs_version: 'HTTP/1.1',
    cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
    cs_cookie: '-',
    cs_referer: '-',
    cs_host: '192.168.0.52',
    sc_status: '200',
    sc_substatus: '0',
    sc_win32_status: '0',
    sc_bytes: '936',
    cs_bytes: '116',
    time_taken: '10',
  },
  {
    date: '2019-02-22',
    time: '09:16:50',
    s_sitename: 'W3SVC1',
    s_computername: 'WIN2008R2-TEST',
    server_ip: '192.168.0.52',
    cs_method: 'GET',
    cs_uri_stem: '/',
    cs_uri_query: '-',
    s_port: '80',
    cs_username: '-',
    c_ip: '192.168.0.66',
    cs_version: 'HTTP/1.1',
    cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
    cs_cookie: '-',
    cs_referer: '-',
    cs_host: '192.168.0.52',
    sc_status: '200',
    sc_substatus: '0',
    sc_win32_status: '0',
    sc_bytes: '936',
    cs_bytes: '116',
    time_taken: '10',
  },
  {
    date: '2019-02-22',
    time: '09:16:50',
    s_sitename: 'W3SVC1',
    s_computername: 'WIN2008R2-TEST',
    server_ip: '192.168.0.52',
    cs_method: 'GET',
    cs_uri_stem: '/',
    cs_uri_query: '-',
    s_port: '80',
    cs_username: '-',
    c_ip: '192.168.0.66',
    cs_version: 'HTTP/1.1',
    cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
    cs_cookie: '-',
    cs_referer: '-',
    cs_host: '192.168.0.52',
    sc_status: '200',
    sc_substatus: '0',
    sc_win32_status: '0',
    sc_bytes: '936',
    cs_bytes: '116',
    time_taken: '10',
  },
  {
    date: '2019-02-22',
    time: '09:16:50',
    s_sitename: 'W3SVC1',
    s_computername: 'WIN2008R2-TEST',
    server_ip: '192.168.0.52',
    cs_method: 'GET',
    cs_uri_stem: '/',
    cs_uri_query: '-',
    s_port: '80',
    cs_username: '-',
    c_ip: '192.168.0.66',
    cs_version: 'HTTP/1.1',
    cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
    cs_cookie: '-',
    cs_referer: '-',
    cs_host: '192.168.0.52',
    sc_status: '200',
    sc_substatus: '0',
    sc_win32_status: '0',
    sc_bytes: '936',
    cs_bytes: '116',
    time_taken: '11',
  },
  {
    date: '2019-02-22',
    time: '09:16:50',
    s_sitename: 'W3SVC1',
    s_computername: 'WIN2008R2-TEST',
    server_ip: '192.168.0.52',
    cs_method: 'GET',
    cs_uri_stem: '/',
    cs_uri_query: '-',
    s_port: '80',
    cs_username: '-',
    c_ip: '192.168.0.66',
    cs_version: 'HTTP/1.1',
    cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
    cs_cookie: '-',
    cs_referer: '-',
    cs_host: '192.168.0.52',
    sc_status: '200',
    sc_substatus: '0',
    sc_win32_status: '0',
    sc_bytes: '936',
    cs_bytes: '116',
    time_taken: '16',
  },
].map(val => Object.values(val));

class WebTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      // data: data.webData,
    };
    this.handleData = this.handleData.bind(this);
  }

  componentDidMount() {
    // console.log('???? Dit mount Webbbb');
    const x = new Promise(resolve => {
      console.log(this.props.dateRange);
      const { start: startDate, end: endDate } = this.props.dateRange;
      let curData = [];
      if (startDate != '')
        curData = data.webData.filter(
          val =>
            moment(startDate) <= moment(val[0]) &&
            moment(val[0]) <= moment(endDate)
        );
      else curData = data.webData;
      // console.log('Web table wll mount..', curData);
      resolve(curData);
    });
    x.then(curData => {
      this.setState({
        data: curData,
      });
    });
  }

  // componentDidMount() {
  //   console.log('Web table did mount..');
  // }

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
          <Typography style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {data}
          </Typography>
        ),
      },
    }));

    // console.log(genDataTable);
    // const data = genDataTable;
    const startDate = this.props.dateRange.start;
    const endDate = this.props.dateRange.end;
    const { data } = this.state;
    // console.log('in web..', data);
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
                  `Báo cáo kết quả phân tích dữ liệu Web ${
                    startDate
                      ? `từ ${moment(startDate).format('DD-MM-YYYY')} `
                      : ''
                  } ${
                    endDate ? `đến ${moment(endDate).format('DD-MM-YYYY')}` : ''
                  }`,
                  JSON.parse(JSON.stringify(columns)),
                  JSON.parse(JSON.stringify(data)),
                  true,
                  'A1',
                  'landscape'
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
    // if (data.length === 0) return <Loading />;
    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title="Web Logs"
          data={data}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  const { dateRange } = state.dashboard;
  return {
    dateRange,
  };
}

export default connect(mapStateToProps)(WebTable);
