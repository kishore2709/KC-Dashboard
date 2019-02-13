import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MUIDataTable from "mui-datatables";
import MultiselectCheckbox from '../MultiselectCheckbox/MultiselectCheckbox';
import { Grid, Button } from '@material-ui/core';

const styles = theme => ({
});

class DataTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.DataParser(props.users),
    };
  }

  MultiselectCheckboxRender = (value, tableMeta, updateValue) => {
    return (
      <MultiselectCheckbox 
        classes={this.props.classes} 
        mainBool={value.canAccess}
        subBools={value.subArr}
        fireUpAccessChange={this.handleAccessChange(tableMeta.rowIndex, tableMeta.columnIndex)}
      />
    );
  }

  handleAccessChange = (rowIndex, columnIndex) => (mainBool, subBools) => {
    let newData = this.state.data;
    newData[rowIndex][columnIndex] = { 
      canAccess: mainBool, 
      subArr: subBools,
    };
    this.setState({
      data: newData,
    });
  }

  DataParser = (data) => {
    return data.map(curData => {
      const { username, role, permissions } = curData;
      const result = [
        username,
        role,
        permissions.dashboard,
        permissions.user,
        permissions.permission,
        permissions.logManager,
        permissions.serviceManager,
        permissions.attackReport,
      ];
      return result;
    });
  }

  handleSubmit = () => {
    const { data } = this.state;
    let newUsers = this.props.users;
    for (var index = 0; index < data.length; index++) {
      newUsers[index].permissions = {
        dashboard: data[index][2],
        user: data[index][3],
        permission: data[index][4],
        logManager: data[index][5],
        serviceManager: data[index][6],
        attackReport: data[index][7],
      };
    }
    this.props.fireUpSubmit(newUsers);
  }

  render() {

    const columns = [
      {
        name: 'Username',
        options: {
          filter: false,
        },
      }, {
        name: 'Role',
        options: {
          display: 'false',
          sort: false,
        },  
      }, {
        name: 'Dashboard',
        options: {
          filter: false,
          sort: false,
          customBodyRender: this.MultiselectCheckboxRender,
        },
      }, {
        name: 'User',
        options: {
          filter: false,
          sort: false,
          customBodyRender: this.MultiselectCheckboxRender,
        },
      }, {
        name: 'Permission',
        options: {
          filter: false,
          sort: false,
          customBodyRender: this.MultiselectCheckboxRender,
        },
      }, {
        name: 'Log Manager',
        options: {
          filter: false,
          sort: false,
          customBodyRender: this.MultiselectCheckboxRender,
        },
      }, {
        name: 'Service Manager',
        options: {
          filter: false,
          sort: false,
          customBodyRender: this.MultiselectCheckboxRender,
        },
      }, {
        name: 'Attack Report',
        options: {
          filter: false,
          sort: false,
          customBodyRender: this.MultiselectCheckboxRender,
        },
      },           
    ];

    const options = {
      download: false,
      viewColumns: false,
      print: false,
      filter: true,
      selectableRows: false,
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
        >
          <MUIDataTable title={"Tùy chỉnh quyền người dùng"} data={this.state.data} columns={columns} options={options} />
        </Grid>
        <Grid item xs={false} sm={4}/>
        <Grid
          item
          xs={12}
          sm={4}
        >
          <Button variant="contained" color="primary" fullWidth
            onClick={this.handleSubmit}
          >
            Gửi
          </Button>
        </Grid>
        <Grid item xs={false} sm={4}/>
      </Grid>
    );

  }
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  fireUpSubmit: PropTypes.func,
  user: PropTypes.array,
};

export default withStyles(styles)(DataTable);