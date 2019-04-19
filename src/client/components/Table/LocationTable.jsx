import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import MUIDataTable from 'mui-datatables';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/BorderColor';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import LocationDialog from 'components/Dialogs/LocationDialog.jsx';
import AddLocationDialog from 'components/Dialogs/AddLocationDialog.jsx';

import { PostApi } from '_helpers/Utils';
import { locationDialogActions, locationTableActions } from '_actions';
import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Typography } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import CustomFooter from './CustomFooter.jsx';

// import TableLoader from 'components/ContentLoader/TableLoader.jsx';
// import { List } from 'react-content-loader'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class LocationTable extends React.Component {
  state = {
    openDialog: false,
    rows: [],
    loading: true,
    groups: [],
    addUserDialog: false,
  };

  componentDidMount() {
    /*
    PostApi('/api/users/getUsers', {})
      .then(res => {
        // console.log(res);
        if (!res || !Array.isArray(res) || 'message' in res || res === 'err')
          return 0;
        const result = res.map(x => {
          const { _id, ...rest } = x;
          return { id: _id, ...rest };
        });
        // console.log(res);
        // this.setState({ rows: result });
        this.props.setTable(result);
        this.setState({ loading: false });
      })
      .catch(err => {
        console.log('get data from database err');
      });
    PostApi('/api/groups/getGroups', {})
      .then(res => {
        if (!res || !Array.isArray(res) || 'message' in res || res === 'err')
          return 0;
        // console.log('get Groups..');
        // console.log(res);
        this.props.setGroup(res);
      })
      .catch(err => {
        console.log('get usergroups from database err');
      });
      */
  }

  render() {
    // khi chua Load xong data from Sv
    // const { loading } = this.state;

    // add: thao tac add User - redux
    // update: Thao tac update User - redux
    // userTable : data for table;
    // updateTable: update user in Table
    // addTable: add User in table
    // setTable : setTable when fetch done
    const {
      add,
      delTable,
      update,
      locationTable,
      updateTable,
      addTable,
      setTable,
      dialog,
    } = this.props;
    // console.log('in UserTable');
    // console.log(userTable);
    const columns = [
      {
        name: 'Tên vị trí',
        options: {
          filter: true,
        },
      },
      {
        name: 'Địa chỉ',
        options: {
          filter: true,
        },
      },
      {
        name: 'Nguồn dữ liệu',
        options: {
          filter: true,
        },
      },
      {
        name: 'Tùy chọn',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => (
            <ButtonBase>
              <EditIcon
                fontSize="small"
                color="action"
                titleAccess="Chỉnh sửa thông tin vị trí"
                onClick={() => {
                  const {
                    locName,
                    location,
                    dataSource,
                  } = this.props.locationTable[tableMeta.rowIndex];
                  this.props.openDialog(true);
                  update({
                    locName,
                    location,
                    dataSource,
                  });
                }}
              />
            </ButtonBase>
          ),
        },
      },
    ];

    const data = locationTable.map(val => {
      const { locName, location, dataSource } = val;
      return [locName, location, dataSource, true];
    });

    // console.log(data);
    const options = {
      selectableRows: true,
      filter: false,
      print: false,
      download: false,
      viewColumns: false,
      sort: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      textLabels: {
        body: {
          noMatch: 'Không có dữ liệu phù hợp',
          toolTip: 'Sắp xếp',
        },
        pagination: {
          next: 'Trang sau',
          previous: 'Trang trước',
          rowsPerPage: 'Dòng/Trang',
          displayRows: 'trên',
        },
        toolbar: {
          search: 'Tìm kiếm',
          filterTable: 'Lọc',
        },
        filter: {
          all: 'Tất cả',
          title: 'LỌC',
          reset: 'Khôi phục',
        },
        selectedRows: {
          text: 'dòng đã chọn',
          delete: 'Xóa',
          deleteAria: 'Xóa các dòng đã chọn',
        },
      },
      customToolbar: () => (
        <Tooltip title="Thêm vị trí">
          <IconButton
            aria-label="Add Location"
            onClick={() => {
              // truong hop them nguoi dung moi
              // this.props.openDialog(true);
              // this.props.add();
              // console.log(this.props);
              this.props.addLocationDialog({
                type: 'addLocationDialog',
                message: { open: true },
              });
            }}
          >
            <PersonAddIcon />
          </IconButton>
        </Tooltip>
      ),
      onRowsDelete: e => {
        const { locationTable, toastManager } = this.props;
        const asyncDeleteFunction = async function delFunc(rows) {
          const needDelArr = rows.map(val => locationTable[val.index]);
          await Promise.all(
            needDelArr.map(async val => {
              await delTable(val);
              /*
              await PostApi('/api/users/deleteDb', val)
                .then(res => {
                  if (res === 'err') {
                    // alertErr();
                    // ret.push(row);
                    // return 'err';
                    toastManager.add(`Thao tác gặp lỗi!!`, {
                      appearance: 'error',
                      autoDismiss: true,
                    });
                    console.log('err');
                  } else {
                    console.log('del ok');
                    // status = false;
                    toastManager.add('Xóa thành công', {
                      appearance: 'success',
                      autoDismiss: true,
                    });
                  }
                  // toastManager.add('Xóa thành công', {
                  //   appearance: 'success',
                  //   autoDismiss: true,
                  // });
                })
                .catch(err => {
                  console.log('delete data from database err');
                  toastManager.add(`Thao tác gặp lỗi!!`, {
                    appearance: 'error',
                    autoDismiss: true,
                  });
                  // ret.push(row);
                  // alertErr();
                });
              */
            })
          );
        };
        asyncDeleteFunction(e.data);
      },
    };

    return (
      <React.Fragment>
        <AddLocationDialog />
        <LocationDialog />
        <MUIDataTable
          title="Danh sách địa điểm"
          data={data}
          columns={columns}
          options={options}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  update: newStatus => {
    dispatch(locationDialogActions.updateDialog(newStatus));
  },
  add: newStatus => {
    dispatch(locationDialogActions.addDialog(newStatus));
  },
  updateTable: newStatus => {
    dispatch(locationTableActions.update(newStatus));
  },
  delTable: newStatus => {
    dispatch(locationTableActions.del(newStatus));
  },
  addTable: newStatus => {
    dispatch(locationTableActions.add(newStatus));
  },
  setTable: newStatus => {
    dispatch(locationTableActions.set(newStatus));
  },
  setGroup: newStatus => {
    dispatch(groupTableActions.set(newStatus));
  },
  openDialog: newStatus => {
    dispatch(locationDialogActions.openDialog(newStatus));
  },
  addLocationDialog: newStatus => {
    dispatch(newStatus);
  },
});

function mapStateToProps(state) {
  const { locationTable, dialog } = state;
  return { locationTable, dialog };
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(withStyles(styles)(LocationTable)));
