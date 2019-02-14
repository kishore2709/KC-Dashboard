import React from 'react';
import MUIDataTable from 'mui-datatables';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/BorderColor';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import UserDialog from 'components/Dialogs/UserDialog.jsx';
import { PostApi } from '_helpers/Utils';
import { dialogActions, userTableActions } from '_actions';
import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Typography } from '@material-ui/core';
import CustomFooter from './CustomFooter.jsx';
// import TableLoader from 'components/ContentLoader/TableLoader.jsx';
// import { List } from 'react-content-loader'

class UserTable extends React.Component {
  state = {
    openDialog: false,
    rows: [],
    loading: true,
  };

  componentWillMount() {
    PostApi('/api/users/getUsers', {})
      .then(res => {
        // console.log(res);
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
        name: 'Fullname',
        options: {
          filter: true,
        },
      },
      {
        name: 'Username',
        options: {
          filter: true,
        },
      },
      {
        name: 'Role',
        options: {
          filter: true,
        },
      },
      {
        name: 'Status',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) =>
            value ? (
              <Typography color="primary">Active</Typography>
            ) : (
              <Typography color="error">Inactive</Typography>
            ),
        },
      },
      {
        name: 'Options',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => (
            <IconButton
              onClick={() => {
                // console.log(tableMeta.rowIndex);
                // console.log(this.props.userTable);
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

                // this.setState({ openDialog: true });
              }}
            >
              <EditIcon />
            </IconButton>
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
      filter: true,
      selectableRows: true,
      filterType: 'dropdown',
      responsive: 'stacked',
      customToolbar: () => (
        <Tooltip title="Thêm người dùng">
          <IconButton
            aria-label="Add User"
            onClick={() => {
              // truong hop them nguoi dung moi
              this.props.openDialog(true);
              this.props.add();
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
                    toastManager.add(`Something went wrong!`, {
                      appearance: 'error',
                      autoDismiss: true,
                    });
                    console.log('err');
                  } else {
                    console.log('del ok');
                    // status = false;
                    toastManager.add('Deleted Successfully', {
                      appearance: 'success',
                      autoDismiss: true,
                    });
                  }
                  // toastManager.add('Deleted Successfully', {
                  //   appearance: 'success',
                  //   autoDismiss: true,
                  // });
                })
                .catch(err => {
                  console.log('delete data from database err');
                  toastManager.add(`Something went wrong!`, {
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
        <UserDialog />
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
  openDialog: newStatus => {
    dispatch(dialogActions.openDialog(newStatus));
  },
});

function mapStateToProps(state) {
  const { userTable, dialog } = state;
  return { userTable, dialog };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(UserTable));
