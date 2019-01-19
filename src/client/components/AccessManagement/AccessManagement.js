/* eslint-disable react/no-multi-comp */
import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import { FormControl, InputLabel } from '@material-ui/core';
import Loading from 'components/Loading/Loading.jsx';
import { withStyles } from '@material-ui/core/styles';

import { withToastManager } from 'react-toast-notifications';
import { GetUserInfo, PostApi } from '../../_helpers/Utils';

import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  formControl: {
    width: '100%',
    minWidth: 120,
  },
  permissionCheckboxCell: {
    display: 'flex',
  },
});

class SubPermissionMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }

  render() {

    const { anchorEl } = this.state;
    const { subPermission, canAccess } = this.props;
    const open = Boolean(anchorEl);

    return (
      <React.Fragment>
        { subPermission != null ? (
          <React.Fragment>
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
              onClose={this.handleClose}
            >
              {subPermission.map((permission, index) => (
                <MenuItem key={index}>
                  <Checkbox
                    checked={permission}
                    onChange={this.handleSubPermissionChange(index)}
                  />
                </MenuItem>
              ))}
            </Menu>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = event => {
    this.setState({ anchorEl: null });
  };

  handleSubPermissionChange = index => event => {
    const result = this.props.subPermission.map((permission, _index) =>
      _index === index ? event.target.checked : permission
    );
    this.props.fireUpSubPermissionChange(result);
  };

}

SubPermissionMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

class PermissionCheckbox extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes, subPermission, canAccess } = this.props;

    return (
      <div className={classes.permissionCheckboxCell}>
        {canAccess != null ? (
          <React.Fragment>
            <Checkbox checked={canAccess} onChange={this.handleCanAccessChange} />
            <Fade in={canAccess}>
              <div>
                <SubPermissionMenu
                  canAccess={canAccess}
                  subPermission={subPermission}
                  fireUpSubPermissionChange={this.handleSubPermissionChange}
                  classes={this.props.classes}
                />
              </div>
            </Fade>
          </React.Fragment>
        ) : null}
      </div>
    );
  }

  handleCanAccessChange = event => {
    const result = event.target.checked;
    this.props.fireUpCanAccessChange(result);
  };

  handleSubPermissionChange = result => {
    this.props.fireUpSubPermissionChange(result);
  };
}

PermissionCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
};

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
      }
      return accumulator.concat(currentValue.role);
    }, []);
    this.setState({
      users: this.props.users,
      columns: this.props.columns,
      roles,
    });
  }

  render() {

    const { classes } = this.props;
    const { columns, page, rowsPerPage, filter, search, roles } = this.state;
    const users = this.state.users
      .filter(user => user.username.includes(search))
      .filter(user => user.role.includes(filter));
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              Username
            </TableCell>
            {columns.map(column => (
              <TableCell key={column} align="center">
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 && (
            users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(user => user.permissions != null ? (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  {columns.map(column => (
                    <TableCell key={column}>
                      {user.permissions[column] != null ? (
                        <PermissionCheckbox
                          canAccess={user.permissions[column].canAccess}
                          fireUpCanAccessChange={this.handleCanAccessChange(
                            user.id,
                            column
                          )}
                          subPermission={user.permissions[column].subArr}
                          fireUpSubPermissionChange={this.handleSubPermissionChange(
                            user.id,
                            column
                          )}
                          classes={this.props.classes}
                        />
                      ) : null}
                    </TableCell>
                  ))}
                </TableRow>
              ) : null)
          )}
          {emptyRows > 0 && (

            <TableRow style={{ height: 57 * emptyRows }}>
              <TableCell colSpan={columns.length + 1} align="center">
                {users.length > 0 ? '' : 'No result'}
              </TableCell>
            </TableRow>
          )}
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
            />
          </TableRow>
          <TableRow>
            <TableCell colSpan={1}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="filter">Filter</InputLabel>
                <Select
                  value={filter}
                  onChange={this.handleChangeFilter}
                  inputProps={{
                    name: 'Filter',
                    id: 'filter',
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  {roles.map((role, index) => (
                    <MenuItem key={index} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
            <TableCell colSpan={2}>
              <TextField
                value={search}
                onChange={this.handleChangeSearch}
                label="Search"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={1}>
              <Button
                variant="contained"
                onClick={this.handleSubmit}
                color="primary"
                fullWidth
                style={{ marginTop: '20px', marginBottom: '20px' }}
              >
                Save Changes
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }

  handleCanAccessChange = (userId, column) => newChecked => {
    const { users } = this.props;
    const userIndex = users.reduce((accumulator, currentValue, index) => {
      if (currentValue.id === userId) {
        return index;
      } else {
        return accumulator;
      }
    }, -1);
    if (userIndex === -1) return;
    users[userIndex].permissions[column].canAccess = newChecked;
    this.setState({ users });
  };

  handleSubPermissionChange = (userId, column) => newSubPermission => {
    const { users } = this.props;
    const userIndex = users.reduce((accumulator, currentValue, index) => {
      if (currentValue.id === userId) {
        return index;
      } else {
        return accumulator;
      }
    }, -1);
    if (userIndex === -1) return;
    users[userIndex].permissions[column].subArr = newSubPermission;
    this.setState({ users });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChangeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  handleChangeSearch = event => {
    this.setState({ search: event.target.value });
  };

  handleSubmit = event => {
    this.props.fireUpHandleSubmit(this.state.users);
  };
}

AccessTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

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
      .then(users => this.setState({ users }))
      .then(() => this.SetupColumns())
      .then(columns => this.setState({ columns }))
      .then(() => this.setState({ loading: false }));
  }

  render() {
    const { users, loading, columns } = this.state;
    const { classes } = this.props;

    if (loading) {
      return (
        <Loading/>
      );
    }
    return (
      <Paper className={classes.root}>
        <AccessTable
          columns={columns}
          users={users}
          fireUpHandleSubmit={this.solveHandleSubmit}
          classes={this.props.classes}
        />
      </Paper>
    );
  }

  GetAllUserData = () => this.GetAllUsers;

  SetupColumns = () =>
    new Promise((resolve, reject) => {
      const { users } = this.state;
      const result = users.reduce((accumulator, currentValue) => {
        if (currentValue.permissions != null) {
          return accumulator.concat(
            Object.keys(currentValue.permissions).filter(
              _currentValue => !accumulator.includes(_currentValue)
            )
          );
        }
        return accumulator;
      }, []);
      resolve(result);
    });

  solveHandleSubmit = newUsers => {
    console.log(newUsers);
    PostApi('/api/users/updateDb', newUsers)
      .then(res => {
        if (res === 'err') {
          this.props.toastManager.add(`Something went wrong: `, {
            appearance: 'error',
            autoDismiss: true,
          });
          console.log('update data from database err in AcessManagement');

          // ret = 'err';
        } else {
          this.props.toastManager.add('Updated Successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          this.setState({ users: newUsers });
        }
      })
      .catch(err => {
        // ret = 'err';
        this.props.toastManager.add(`Something went wrong: `, {
          appearance: 'error',
          autoDismiss: true,
        });
        console.log('update data from database err in AcessManagement');
      });
  };

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
      if (ret !== 'err') console.log('ok update ok');
    });
    return null;
  };

  GetAllUsers = () =>
    PostApi('/api/users/getUsers', {})
      .then(res => {
        const result = res.map(x => {
          const { _id, ...rest } = x;
          return { id: _id, ...rest };
        });
        console.log(result);
        return Promise.resolve(result.filter(x => x.role !== 'Admin'));
      })
      .catch(err => {
        console.log('get data from database err');
      });

  // =================
}

AccessManagement.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withToastManager(withStyles(styles)(AccessManagement));