import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MUIDataTable from "mui-datatables";
import { Typography, Grid } from '@material-ui/core';

const styles = theme => ({
});

class LogTable extends Component {

  constructor(props) {
    super(props);

  }

  render() {

    const logData = _DataParser(_data); 

    const columns = [
      {
        name: 'Time',
        options: {
          filter: false,
        },
      }, {
        name: 'Username',
      }, {
        name: 'Status',
        options: {
          customBodyRender: status => 
            status ? <Typography variant='caption' color='primary'>Success</Typography> 
                   : <Typography variant='caption' color='error'>Error</Typography>
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
    };

    return (
      <Grid
        container
        spacing={24}
      >
        <Grid
          item
          xs={12}
          sm={6}
        >
          <MUIDataTable title={"LogIn Logs"} data={logData.in} columns={columns} options={options} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <MUIDataTable title={"LogOut Logs"} data={logData.out} columns={columns} options={options} />
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
  const logData = {
    in: data.message.filter(curLog => curLog.isLogin).map(curLog => [curLog.timestamp, curLog.username, curLog.status]),
    out: data.message.filter(curLog => !curLog.isLogin).map(curLog => [curLog.timestamp, curLog.username, curLog.status]),
  }
  return logData;
}

const _data = {
  "message": [
      {
          "_id": "5c62a45c51c74814281187d0",
          "username": "admin",
          "timestamp": "2019-02-12T10:47:55.000Z",
          "status": true,
          "isLogin": true,
          "__v": 0
      },
      {
          "_id": "5c62a47a51c74814281187d1",
          "username": "admin",
          "timestamp": "2019-02-12T10:48:26.000Z",
          "status": true,
          "isLogin": true,
          "__v": 0
      },
      {
          "_id": "5c62a4dd51c74814281187d2",
          "username": "admin",
          "timestamp": "2019-02-12T10:50:04.000Z",
          "status": true,
          "isLogin": true,
          "__v": 0
      },
      {
          "_id": "5c62a4e551c74814281187d3",
          "username": "admin",
          "timestamp": "2019-02-12T10:50:13.000Z",
          "status": false,
          "isLogin": false,
          "__v": 0
      },
      {
          "_id": "5c62a4eb51c74814281187d4",
          "username": "admin",
          "timestamp": "2019-02-12T10:50:19.000Z",
          "status": true,
          "isLogin": false,
          "__v": 0
      },
      {
          "_id": "5c62a50051c74814281187d5",
          "username": "admin",
          "timestamp": "2019-02-12T10:50:39.000Z",
          "status": true,
          "isLogin": true,
          "__v": 0
      },
      {
          "_id": "5c62a51951c74814281187d6",
          "username": "admin",
          "timestamp": "2019-02-12T10:51:05.000Z",
          "status": false,
          "isLogin": true,
          "__v": 0
      },
      {
          "_id": "5c62a6cc815ecd232c86fa6b",
          "username": "admin",
          "timestamp": "2019-02-12T10:58:20.000Z",
          "status": false,
          "isLogin": false,
          "__v": 0
      },
      {
          "_id": "5c62a82a9f2dec2a68a34adb",
          "username": "admin",
          "timestamp": "2019-02-12T11:04:09.000Z",
          "status": true,
          "isLogin": true,
          "__v": 0
      },
      {
          "_id": "5c62a8a89f2dec2a68a34adc",
          "username": "admin",
          "timestamp": "2019-02-12T11:06:16.000Z",
          "status": false,
          "isLogin": true,
          "__v": 0
      },
      {
          "_id": "5c62a8ac9f2dec2a68a34add",
          "username": "admin",
          "timestamp": "2019-02-12T11:06:20.000Z",
          "status": false,
          "isLogin": false,
          "__v": 0
      },
      {
          "_id": "5c62a8e99f2dec2a68a34ade",
          "username": "admin",
          "timestamp": "2019-02-12T11:07:21.000Z",
          "status": false,
          "isLogin": true,
          "__v": 0
      }
  ]
}

