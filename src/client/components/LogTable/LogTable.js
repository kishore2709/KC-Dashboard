import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { Typography, Grid } from '@material-ui/core';
import { PostApi } from '_helpers/Utils';

const styles = theme => ({});

class LogTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  componentWillMount() {
    PostApi('/api/users/getLog', {})
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
  render() {
    console.log(this.state.data);
    const logData = _DataParser(this.state.data);
    const columns = [
      {
        name: 'Time',
        options: {
          filter: false,
        },
      },
      {
        name: 'Username',
      },
      {
        name: 'IP Address',
        options: {
          filter: false,
        }
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

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 20],
      page: 0,
      selectableRows: false,
    };

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <MUIDataTable
            title={'Thông tin logs đăng nhập'}
            data={logData.in}
            columns={columns}
            options={options}
          />
        </Grid>
        <Grid item xs={12}>
          <MUIDataTable
            title={'Thông tin Logs đăng xuất'}
            data={logData.out}
            columns={columns}
            options={options}
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
      .map(curLog => [curLog.timestamp, curLog.username, curLog.ip, curLog.status]),
    out: data.message
      .filter(curLog => !curLog.isLogin)
      .map(curLog => [curLog.timestamp, curLog.username, curLog.ip, curLog.status]),
  };
  return logData;
}

const _data = {
};
