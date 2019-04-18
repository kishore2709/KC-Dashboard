import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import MUIDataTable from 'mui-datatables';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/BorderColor';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import UserDialog from 'components/Dialogs/UserDialog.jsx';
import AddUserDialog from 'components/Dialogs/AddUserDialog.jsx';

import { PostApi } from '_helpers/Utils';
import { dialogActions, userTableActions, groupTableActions } from '_actions';
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

class UserTable extends React.Component {
  state = {
    openDialog: false,
    rows: [],
    loading: true,
    groups: [],
    addUserDialog: false,
  };

  componentDidMount() {
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
      userTable,
      updateTable,
      addTable,
      setTable,
      dialog,
    } = this.props;
    // console.log('in UserTable');
    // console.log(userTable);
    const columns = [
      {
        name: 'Tên đầy đủ',
        options: {
          filter: true,
        },
      },
      {
        name: 'Tài khoản',
        options: {
          filter: true,
        },
      },
      {
        name: 'Chức vụ',
        options: {
          filter: true,
        },
      },
      {
        name: 'Trạng thái',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) =>
            value ? (
              <Typography color="primary">Hoạt động</Typography>
            ) : (
              <Typography color="error">Ngưng hoạt động</Typography>
            ),
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
                titleAccess="Chỉnh sửa thông tin người dùng"
                onClick={() => {
                  const {
                    fullname,
                    email,
                    phonenumber,
                    role,
                    status,
                    username,
                    id,
                  } = this.props.userTable[tableMeta.rowIndex];
                  this.props.openDialog(true);
                  update({
                    fullname,
                    email,
                    phonenumber,
                    role,
                    status,
                    username,
                    id,
                  });
                }}
              />
            </ButtonBase>
          ),
        },
      },
    ];

    const data = userTable.map(val => {
      const { fullname, email, phonenumber, role, status, username, id } = val;
      return [fullname, username, role, status, true];
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
        <Tooltip title="Thêm người dùng">
          <IconButton
            aria-label="Add User"
            onClick={() => {
              // truong hop them nguoi dung moi
              // this.props.openDialog(true);
              // this.props.add();
              console.log(this.props);
              this.props.addUserDialog({
                type: 'addUserDialog',
                message: { open: true },
              });
            }}
          >
            <PersonAddIcon />
          </IconButton>
        </Tooltip>
      ),
      onRowsDelete: e => {
        const { userTable, toastManager } = this.props;
        const asyncDeleteFunction = async function delFunc(rows) {
          const needDelArr = rows.map(val => userTable[val.index]);
          await Promise.all(
            needDelArr.map(async val => {
              delTable(val);
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
            })
          );
        };
        asyncDeleteFunction(e.data);
      },
    };

    return (
      <React.Fragment>
        <AddUserDialog />
        <UserDialog groups={this.state.groups} />
        <MUIDataTable
          title="Danh sách người dùng"
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
    dispatch(dialogActions.updateDialog(newStatus));
  },
  add: newStatus => {
    dispatch(dialogActions.addDialog(newStatus));
  },
  updateTable: newStatus => {
    dispatch(userTableActions.update(newStatus));
  },
  delTable: newStatus => {
    dispatch(userTableActions.del(newStatus));
  },
  addTable: newStatus => {
    dispatch(userTableActions.add(newStatus));
  },
  setTable: newStatus => {
    dispatch(userTableActions.set(newStatus));
  },
  setGroup: newStatus => {
    dispatch(groupTableActions.set(newStatus));
  },
  openDialog: newStatus => {
    dispatch(dialogActions.openDialog(newStatus));
  },
  addUserDialog: newStatus => {
    dispatch(newStatus);
  },
});

function mapStateToProps(state) {
  const { userTable, dialog } = state;
  return { userTable, dialog };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(withStyles(styles)(UserTable)));
