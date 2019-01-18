/* eslint-disable react/no-multi-comp */
import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

import { withToastManager } from 'react-toast-notifications';
import { GetUserInfo, PostApi } from '../../_helpers/Utils';

const styles = theme => ({
  progress: {
  },
  permissionCheckboxCell: {
    display: 'flex',
  },
});

class PermissionCheckbox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    }

  }

  render() {

    const { classes, subPermission, canAccess } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.permissionCheckboxCell}>
        <Checkbox
          checked={canAccess}
          onChange={this.handleCanAccessChange}
        />
        <IconButton
          aria-label="Sub-Permission"
          aria-owns={open ? 'sub-permission' : undefined}
          aria-haspopup="true"
          disabled={!canAccess}
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="sub-permission"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}>
          {subPermission.map((permission, index) => (
            <MenuItem
              key={index}
            >
              <Checkbox
                checked={permission}
                onChange={this.handleSubPermissionChange(index)}
              />
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = event => {
    this.setState({ anchorEl: null });
  }

  handleCanAccessChange = event => {
    const result = event.target.checked;
    this.props.fireUpCanAccessChange(result);
  }

  handleSubPermissionChange = index => event => {
    const result = this.props.subPermission.map((permission, _index) => _index === index ? event.target.checked : permission);
    this.props.fireUpSubPermissionChange(result);
  }

}

class AccessTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      columns: [],
      roles: [],
      page: 0,
      rowsPerPage: 5,
      filter: '',
      search: '',
    };

  }

  componentDidMount() {
    const roles = this.props.users.reduce((accumulator, currentValue) => {
      if (accumulator.includes(currentValue.role)) {
        return accumulator;
      } else {
        return accumulator.concat(currentValue.role);
      }
    }, []);
    this.setState({
      users: this.props.users,
      columns: this.props.columns,
      roles: roles,
    });
  }

  render() {

    const { columns, page, rowsPerPage, filter, search, roles } = this.state;
    const users = this.state.users.filter(user => user.username.includes(search)).filter(user => user.role.includes(filter));

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Username</Typography>
            </TableCell>
            {columns.map((column, index) => (
              <TableCell 
                key={index}
                align='center'
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          { 
            users.length > 0 
            ? (users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
              <TableRow key={index}>
                <TableCell>
                  {user.username}
                </TableCell>
                {columns.map((column, _index) => (
                  <TableCell key={_index}>
                    <PermissionCheckbox 
                      canAccess={user.permissions[column].canAccess}
                      fireUpCanAccessChange={this.solveCanAccessChange(index, _index)}
                      subPermission={user.permissions[column].subArr}
                      fireUpSubPermissionChange={this.solveSubPermissionChange(index, _index)}
                      classes = {this.props.classes}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))) 
            : (<TableRow>
                <TableCell 
                  colSpan={columns.length + 1}
                  align='center'
                >
                  No results
                </TableCell>
              </TableRow>)
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              colSpan={1}
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            >
            </TablePagination>
          </TableRow>
          <TableRow>
            <TableCell
              colSpan={1}
            >
              <Select
                value={filter}
                onChange={this.handleChangeFilter}  
              >
                <MenuItem value={''}>All</MenuItem>
                {roles.map((role, index) => (
                  <MenuItem
                    key={index}
                    value={role}
                  >
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
            <TableCell
              colSpan={2}
            >
            <TextField
              value={search}
              onChange={this.handleChangeSearch}
              label='Search'
            />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              colSpan={1}
            >
              <Button 
                variant="contained" 
                onClick={this.handleSubmit}
                color='primary'
              >
                Submit
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }

  solveCanAccessChange = (userIndex, columnIndex) => newChecked => {
    const { users, columns } = this.props;
    users[userIndex].permissions[columns[columnIndex]].canAccess = newChecked;
    this.setState({ users: users });
  }

  solveSubPermissionChange = (userIndex, columnIndex) => newSubPermission => {
    const { users, columns } = this.props;
    users[userIndex].permissions[columns[columnIndex]].subArr = newSubPermission;
    this.setState({ users: users });
  }

  handleChangePage = (event, page) => {
    this.setState({ page: page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChangeFilter = event => {
    this.setState({ filter: event.target.value });
  }

  handleChangeSearch = event => {
    this.setState({ search: event.target.value });
  }
  
  handleSubmit = event => {
    this.props.fireUpHandleSubmit(this.state.users);
  }

}

class AccessManagement extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: true,
      columns: [],
    };

  }

  componentDidMount() {
    this.GetAllUsers()
    .then(users => this.setState({ users: users }))
    .then(() => this.SetupColumns())
    .then(columns => this.setState({ columns: columns }))
    .then(() => this.setState({ loading: false }));
  }

  render() {

    const { users, loading, columns } = this.state;
    const { classes } = this.props;

    if (loading) {
      return (
        <div>
          <CircularProgress className={classes.progress} />
        </div>
      );
    } else {
      return (
        <Paper>
          <AccessTable
            columns = {columns}
            users = {users}
            fireUpHandleSubmit = {this.solveHandleSubmit}
            classes = {this.props.classes} 
          />
        </Paper>
      );
    }
  }

  GetAllUserData = () => this.GetAllUsers;

  SetupColumns = () => {
    return new Promise((resolve, reject) => {
      const { users } = this.state;
      const result = users.reduce(((accumulator, currentValue) => {
        if (Boolean(currentValue.permissions)) {
          return accumulator.concat(Object.keys(currentValue.permissions).filter(_currentValue => !accumulator.includes(_currentValue)));
        } else {
          return accumulator;
        }
      }), []);
      resolve(result);
    });
  }

  solveHandleSubmit = newUsers => {
    this.setState({ users: newUsers }, () => {
      console.log(this.state.users);
      //this.HandleSubmit;
    });
  }


// =================

  HandleSubmit = () => {
    const { toastManager } = this.props;
    const result = this.state.users;

    console.log(result);
    const alertErr = () => {
      toastManager.add(`Something went wrong: `, {
        appearance: 'error',
        autoDismiss: true,
      });
    };
    const asyncUpdateFunction = async function delFunc(rows) {
      await Promise.all(
        rows.map(async row => {
          await PostApi('/api/users/updateDb', row)
            .then(res => {
              if (res === 'err') {
                alertErr();
              } else {
                toastManager.add('Updated Successfully', {
                  appearance: 'success',
                  autoDismiss: true,
                });
              }
            })
            .catch(err => {
              console.log('update data from database err');
              alertErr();
            });
        })
      );
    };
    asyncUpdateFunction(result).then(ret => {
      if (ret !== 'err')
        console.log('ok update ok');
    });
   return null;
  }

  GetAllUsers = () => {
    return PostApi('/api/users/getUsers', {})
      .then(res => {
        console.log(res);
        const result = res.map(x => {
          const { _id, ...rest } = x;
          return { id: _id, ...rest };
        });
        return Promise.resolve(result.filter(x => x.role !== 'Admin'));
      })
      .catch(err => {
        console.log('get data from database err');
      });
  }


// =================

}

export default withStyles(styles)(AccessManagement);

/*
const userData = [
  {
    username: 'User 1',
    password: '1',
    role: 'User',
    status: true,
    permissions: {
      dashboard: { 
        canAccess: true, 
        subArr: [true, false, false] 
      },
      user: { 
        canAccess: true, 
        subArr: [true, false] 
      },
      permission: { 
        canAccess: false, 
        subArr: [true, false] 
      },
      logManager: { 
        canAccess: false, 
        subArr: [false, false] 
      },
      serviceManager: { 
        canAccess: true, 
        subArr: [true, false] 
      },
      attackReport: { 
        canAccess: false, 
        subArr: [false, false] 
      },
      alert: { 
        canAccess: true, 
        subArr: [true, false] 
      },
    },
  },
  {
    username: 'User 2',
    password: '1',
    role: 'User',
    status: true,
    permissions: {
      dashboard: { 
        canAccess: true, 
        subArr: [true, false, false] 
      },
      user: { 
        canAccess: true, 
        subArr: [true, false] 
      },
      permission: { 
        canAccess: false, 
        subArr: [true, false] 
      },
      logManager: { 
        canAccess: false, 
        subArr: [false, false] 
      },
      serviceManager: { 
        canAccess: true, 
        subArr: [true, false] 
      },
      attackReport: { 
        canAccess: false, 
        subArr: [false, false] 
      },
      alert: { 
        canAccess: true, 
        subArr: [true, false] 
      },
    },
  },
  {
    username: 'User 3',
    password: '3',
    role: 'User',
    status: true,
    permissions: {
      dashboard: { 
        canAccess: true, 
        subArr: [true, false, false] 
      },
      user: { 
        canAccess: true, 
        subArr: [true, false] 
      },
      permission: { 
        canAccess: false, 
        subArr: [true, false] 
      },
      logManager: { 
        canAccess: false, 
        subArr: [false, false] 
      },
      serviceManager: { 
        canAccess: true, 
        subArr: [true, false] 
      },
      attackReport: { 
        canAccess: false, 
        subArr: [false, false] 
      },
      alert: { 
        canAccess: true, 
        subArr: [true, false] 
      },
    },
  },
  {
    username: 'User 4',
    password: '1',
    role: 'User',
    status: true,
    permissions: {
      dashboard: { 
        canAccess: true, 
        subArr: [true, true, false] 
      },
      user: { 
        canAccess: true, 
        subArr: [true, false, false] 
      },
      permission: { 
        canAccess: false, 
        subArr: [true, false] 
      },
      logManager: { 
        canAccess: false, 
        subArr: [true, false] 
      },
      serviceManager: { 
        canAccess: true, 
        subArr: [true, false, false, true] 
      },
      attackReport: { 
        canAccess: false, 
        subArr: [true, false] 
      },
      alert: { 
        canAccess: true, 
        subArr: [true, false] 
      },
    },
  },
  {
    username: 'Moderator 1',
    password: '1',
    role: 'Moderator',
    status: true,
    permissions: {
      dashboard: { 
        canAccess: true, 
        subArr: [true, false, false] 
      },
      user: { 
        canAccess: true, 
        subArr: [true, false] 
      },
      permission: { 
        canAccess: false, 
        subArr: [true, false] 
      },
      logManager: { 
        canAccess: true, 
        subArr: [true, false] 
      },
      serviceManager: { 
        canAccess: true, 
        subArr: [true, false] 
      },
      attackReport: { 
        canAccess: true, 
        subArr: [true, false] 
      },
      alert: { 
        canAccess: true, 
        subArr: [true, false] 
      },
    },
  },
  {
    username: 'Admin 1',
    password: '1',
    role: 'Admin',
    status: true,
    permissions: {
      dashboard: { 
        canAccess: true, 
        subArr: [true, false, false] 
      },
      user: { 
        canAccess: true, 
        subArr: [true, false] 
      },
      permission: { 
        canAccess: true, 
        subArr: [true, false] 
      },
      logManager: { 
        canAccess: true, 
        subArr: [true, false] 
      },
      serviceManager: { 
        canAccess: true, 
        subArr: [true, false] 
      },
      attackReport: { 
        canAccess: true, 
        subArr: [true, false] 
      },
      alert: { 
        canAccess: true, 
        subArr: [true, false] 
      },
    },
  }
];
*/