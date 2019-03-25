import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { Typography, Grid } from '@material-ui/core';
import { PostApi } from '_helpers/Utils';
import { makePdf, MakeExcel } from '_helpers/Utils/';
import moment from 'moment';
// icon
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

const styles = theme => ({
  canOverflow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

class LogTable extends Component {
  controller = new AbortController();

  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentWillMount() {
    PostApi('/api/users/getLog', {}, this.controller.signal)
      .then(res => {
        if (!res || res === 'err') {
          console.log('err get log info');
        } else {
          // console.log(res);
          this.setState({ data: res });
        }
      })
      .catch(err => {
        console.log('geterr get log info err');
      });
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  render() {
    // console.log(this.state.data);
    const logData = _DataParser(this.state.data);
    const { classes } = this.props;
    const columns = [
      {
        name: 'Time',
        options: {
          filter: false,
          customBodyRender: data => (
            <Typography className={classes.canOverflow}>{data}</Typography>
          ),
        },
      },
      {
        name: 'Username',
        options: {
          customBodyRender: data => (
            <Typography className={classes.canOverflow}>{data}</Typography>
          ),
        },
      },
      {
        name: 'IP Address',
        options: {
          filter: false,
          customBodyRender: data => (
            <Typography className={classes.canOverflow}>{data}</Typography>
          ),
        },
      },
      {
        name: 'Status',
        options: {
          customBodyRender: status =>
            status ? (
              <Typography variant="caption" color="primary">
                Success
              </Typography>
            ) : (
              <Typography variant="caption" color="error">
                Error
              </Typography>
            ),
        },
      },
    ];

    const optionsLogin = {
      filterType: 'dropdown',
      responsive: 'scroll',
      selectableRows: false,
      filter: false,
      viewColumns: false,
      sort: false,
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 20],
      page: 0,
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
                  `LoginReports_${moment().format('DD-MM-YYYY')}`,
                  columns,
                  logData.in,
                  null,
                  'A4'
                );
              }}
            >
              <ArrowDownward />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      ),
    };

    const optionsLogout = {
      filterType: 'dropdown',
      responsive: 'scroll',
      selectableRows: false,
      filter: false,
      viewColumns: false,
      sort: false,
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 20],
      page: 0,
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
                  `LogoutReports_${moment().format('DD-MM-YYYY')}`,
                  columns,
                  logData.out,
                  null,
                  'A4'
                );
              }}
            >
              <ArrowDownward />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      ),
    };
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Thông tin logs đăng nhập"
            data={logData.in}
            columns={columns}
            options={optionsLogin}
          />
        </Grid>
        <Grid item xs={12}>
          <MUIDataTable
            title="Thông tin Logs đăng xuất"
            data={logData.out}
            columns={columns}
            options={optionsLogout}
          />
        </Grid>
      </Grid>
    );
  }
}

LogTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LogTable);

function _DataParser(data) {
  if (!('message' in data)) return {};
  const logData = {
    in: data.message
      .filter(curLog => curLog.isLogin)
      .map(curLog => [
        curLog.timestamp,
        curLog.username,
        curLog.ip,
        curLog.status,
      ]),
    out: data.message
      .filter(curLog => !curLog.isLogin)
      .map(curLog => [
        curLog.timestamp,
        curLog.username,
        curLog.ip,
        curLog.status,
      ]),
  };
  return logData;
}

const _data = {};
