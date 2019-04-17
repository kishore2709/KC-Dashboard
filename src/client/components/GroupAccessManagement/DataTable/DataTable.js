import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { Grid, Button, IconButton, Tooltip } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { connect } from 'react-redux';
import { dialogActions } from '_actions';
import MultiselectCheckbox from '../MultiselectCheckbox/MultiselectCheckbox';
import AddGroupDialog from './AddGroupDialog';

const styles = theme => ({});

class DataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.DataParser(props.users),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users !== this.state.data) {
      this.setState({ data: this.DataParser(nextProps.users) });
    }
  }

  MultiselectCheckboxRender = (value, tableMeta, updateValue) => (
    <MultiselectCheckbox
      classes={this.props.classes}
      mainBool={value.canAccess}
      subBools={value.subArr}
      fireUpAccessChange={this.handleAccessChange(
        tableMeta.rowIndex,
        tableMeta.columnIndex
      )}
    />
  );

  handleAccessChange = (rowIndex, columnIndex) => (mainBool, subBools) => {
    const newData = this.state.data;
    newData[rowIndex][columnIndex] = {
      canAccess: mainBool,
      subArr: subBools,
    };
    this.setState({
      data: newData,
    });
  };

  DataParser = data => data.map(curData => {
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
        permissions.mailBox,
        permissions.exportData,
      ];
      return result;
    });

  handleSubmit = () => {
    const { data } = this.state;
    const newUsers = this.props.users;
    for (let index = 0; index < data.length; index++) {
      newUsers[index].permissions = {
        dashboard: data[index][2],
        user: data[index][3],
        permission: data[index][4],
        logManager: data[index][5],
        serviceManager: data[index][6],
        attackReport: data[index][7],
        mailBox: data[index][8],
        exportData: data[index][9],
      };
    }
    this.props.fireUpSubmit(newUsers);
  };

  render() {
    const columns = [
      {
        name: 'Nhóm',
        options: {
          filter: false,
        },
      },
      {
        name: 'Chức vụ',
        options: {
          display: 'false',
          sort: false,
        },
      },
      {
        name: 'Trang chủ',
        options: {
          filter: false,
          sort: false,
          customBodyRender: this.MultiselectCheckboxRender,
        },
      },
      {
        name: 'Người dùng',
        options: {
          filter: false,
          sort: false,
          customBodyRender: this.MultiselectCheckboxRender,
        },
      },
      {
        name: 'Quyền hạn',
        options: {
          filter: false,
          sort: false,
          customBodyRender: this.MultiselectCheckboxRender,
        },
      },
      {
        name: 'Quản lý Log',
        options: {
          filter: false,
          sort: false,
          customBodyRender: this.MultiselectCheckboxRender,
        },
      },
      {
        name: 'Quản lý dịch vụ',
        options: {
          filter: false,
          sort: false,
          customBodyRender: this.MultiselectCheckboxRender,
        },
      },
      {
        name: 'Báo cáo tấn công',
        options: {
          filter: false,
          sort: false,
          customBodyRender: this.MultiselectCheckboxRender,
        },
      },
      {
        name: 'Hòm thư',
        options: {
          filter: false,
          sort: false,
          customBodyRender: this.MultiselectCheckboxRender,
        },
      },
      {
        name: 'Trích xuất dữ liệu',
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
      sort: false,
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'scroll',
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 20],
      page: 0,
      textLabels: {
        body: {
          noMatch: "Không có dữ liệu phù hợp",
          toolTip: "Sắp xếp",
        },
        pagination: {
          next: "Trang sau",
          previous: "Trang trước",
          rowsPerPage: "Dòng/Trang",
          displayRows: "trên",
        },
        toolbar: {
          search: "Tìm kiếm",
          filterTable: "Lọc",
        },
        filter: {
          all: "Tất cả",
          title: "LỌC",
          reset: "Khôi phục",
        },
      },
      customToolbar: () => (
        <Tooltip
          title="Thêm nhóm"
          onClick={() => {
            this.props.openDialogGroup(true);
          }}
        >
          <IconButton aria-label="Add Group">
            <GroupAddIcon />
          </IconButton>
        </Tooltip>
      ),
    };

    const { classes } = this.props;

    return (
      <React.Fragment>
        <AddGroupDialog onSave={this.props.onAddGroup} />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <MUIDataTable
              title="Tùy chỉnh quyền nhóm người dùng"
              data={this.state.data}
              columns={columns}
              options={options}
            />
          </Grid>
          <Grid item xs={false} sm={4} />
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={this.handleSubmit}
            >
              Gửi
            </Button>
          </Grid>
          <Grid item xs={false} sm={4} />
        </Grid>
      </React.Fragment>
    );
  }
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  fireUpSubmit: PropTypes.func,
  user: PropTypes.array,
};

const mapDispatchToProps = dispatch => ({
  openDialogGroup: newStatus => {
    dispatch(dialogActions.openDialogGroup(newStatus));
  },
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(DataTable));
