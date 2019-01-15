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
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withToastManager } from 'react-toast-notifications';
import { GetUserInfo, PostApi } from '../../_helpers/Utils';
import { TextField, Input } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Menu from '@material-ui/core/Menu';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 4,
  },
  formControl: {
    margin: theme.spacing.unit * 0.5,
    minWidth: 100,
    maxWidth: 100
  },
});

class CoordinateCheckbox extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      subAccArr: [],
      anchorEl: null
    }
  }s

  componentDidMount() {
    this.setState({ subAccArr: this.props.subAccArr });
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    this.props.updateSubAccArr(this.props.row, this.props.col, this.state.subAccArr);
  };

  handleChange = (event, checked, index) => {
    const { subAccArr } = this.state;
    this.setState({subAccArr: subAccArr.map((elem, _index) => 
      _index == index ? event.target.checked : elem)});
  }
  
  render() {
    const { anchorEl, subAccArr } = this.state;
    const { row, col } = this.props;
    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
         {row} - {col}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {subAccArr.map((elem, index) => {
            return (
              <MenuItem key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={elem}
                      onChange={(event, checked) => this.handleChange(event, checked, index)}
                    />
                  }
                  label={index}
                />
              </MenuItem>   
            )
          })}
        </Menu>
      </div>
    );
  }
}

class AccessManagement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabs: [],
      users: [],
      accessMatrix: [],
      loadding: true,
      page: 0,
      rowsPerPage: 5,
      search: '',
      filter: ''
    };
    this.promiseState = this.promiseState.bind(this);
    this.GetAllUsers = this.GetAllUsers.bind(this);
    this.GetAllTabs = this.GetAllTabs.bind(this);
    this.SetupRows = this.SetupRows.bind(this);
    this.SetupColumns = this.SetupColumns.bind(this);
    this.SetupAccessMatrix = this.SetupAccessMatrix.bind(this);
    this.HandleChange = this.HandleChange.bind(this);
    this.HandleSubmit = this.HandleSubmit.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
  }

  promiseState = async state =>
    new Promise(resolve => this.setState(state, resolve));

  componentDidMount() {
    Promise.all([this.SetupColumns(), this.SetupRows()]).then(() => {
      console.log('userrss??');
      console.log(this.state.users);
      this.SetupAccessMatrix();
    });
  }

  SetupAccessMatrix() {
    const accessMatrix = this.state.users.map(user =>
      user.accessArr ? user.accessArr : Array.from(this.state.tabs, () => false)
    );
    this.setState({ accessMatrix, loadding: false }, () => {
      console.log('setup accessmatrix donee!');
      console.log('user');
      console.log(this.state.users);
      console.log('tabs');
      console.log(this.state.tabs);
      console.log(accessMatrix);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  GetAllUsers() {
    /*
    return new Promise((resolve, reject) => {
      const users = Array.from({length: 26}, () => {
        const user = {
          username: Math.random().toString(36).substr(2),
          password: Math.random().toString(36).substr(2),
          role: ['Admin', 'Moderator', 'Moderator', 'User', 'User', 'User'][Math.floor(Math.random() * 6)],
          status: true,
          accessArr: Array.from({length: 6}, () => {
            const subAccArr = Array.from({length: Math.floor(Math.random() * 3) + 1}, () => {
              return Math.random() >= 0.5 ? true : false;
            });
            return subAccArr;
          }),
        }
        return user;
      });
      resolve(users);
    });
    */
    return PostApi('/api/users/getUsers', {})
      .then(res => {
        console.log(res);
        const result = res.map(x => {
          const { _id, ...rest } = x;
          return { id: _id, ...rest };
        });
        // console.log(res);
        return Promise.resolve(result.filter(x => x.role !== 'Admin'));
      })
      .catch(err => {
        console.log('get data from database err');
      });
  }

  SetupRows() {
    return this.GetAllUsers().then(users =>
      this.promiseState({
        users: users.map((user, index) =>
          Object.assign({}, { row_id: index }, user)
        ),
      })
    );
  }

  GetAllTabs() {
    return new Promise((resolve, reject) => {
      const tabs = [
        { name: 'Col-1' },
        { name: 'Col-2' },
        { name: 'Col-3' },
        { name: 'Col-4' },
        { name: 'Col-5' },
        { name: 'Col-6' },
      ];
      resolve(tabs);
    });
  }

  SetupColumns() {
    return this.GetAllTabs().then(tabs =>
      this.promiseState({
        tabs: tabs.map((tab, index) =>
          Object.assign({}, { col_id: index }, tab)
        ),
      })
    );
  }

  HandleChange(event, checked, row, col) {
    const accessMatrix = this.state.accessMatrix.map(elem => elem.slice());
    console.log(accessMatrix);
    console.log(row, col);
    accessMatrix[row][col] = event.target.checked;
    this.setState({ accessMatrix });
  }

  HandleSubmit() {
    const { toastManager } = this.props;
    const result = this.state.users.map((user, index) => ({
      accessArr: this.state.accessMatrix[index].slice(),
      id: user.id,
    }));
    //console.log(result);
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
              // console.log('in then proomse');
              if (res === 'err') {
                alertErr();
              } else {
                // ret.push(newRow);
                toastManager.add('Updated Successfully', {
                  appearance: 'success',
                  autoDismiss: true,
                });
              }
            })
            .catch(err => {
              // ret = 'err';
              console.log('update data from database err');
              alertErr();
            });
        })
      );
    };
    asyncUpdateFunction(result).then(ret => {
      if (ret !== 'err')
        // this.setState({ rows: ret });
        console.log('ok update ok');
    });
   return null;
  }

  handleChangePage(event, page) {
    this.setState({ page });
  };

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChangeSearch(event) {
    this.setState({ search: event.target.value });
  }

  handleChangeFilter(event) {
    this.setState({ filter: event.target.value });
  }

  updateSubAccArr = (row, col, subAccArr) => {
    const { accessMatrix } = this.state;
    accessMatrix[row][col] = subAccArr;
    this.setState({accessMatrix: accessMatrix});
  }

  render() {
    const { tabs, users, loadding, page, rowsPerPage, anchorEl } = this.state;
    let { accessMatrix } = this.state;

    if (loadding)
      return (
        <div>
          <LinearProgress />
          <br />
          <LinearProgress color="secondary" />
        </div>
      );
    // console.log('in render');
    // console.log(accessMatrix);
    accessMatrix = accessMatrix.map(elem => elem.slice());
    // console.log(accessMatrix);
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              {tabs.map(col => (
                <TableCell key={col.col_id} align="center">
                  {col.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .filter(row => row.role.includes(this.state.filter))
              .filter(row => row.username.includes(this.state.search))
              .slice(rowsPerPage * page, rowsPerPage * (page + 1))
              .map(row => (
              <TableRow key={row.row_id}>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                {tabs.map(col => (
                  <TableCell key={col.col_id} align="center">
                    <CoordinateCheckbox
                      row={row.row_id}
                      col={col.col_id}
                      subAccArr={accessMatrix[row.row_id][col.col_id]}
                      updateSubAccArr={this.updateSubAccArr}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                count={users
                        .filter(row => row.role.includes(this.state.filter))
                        .filter(row => row.username.includes(this.state.search))
                        .length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}>
              </TablePagination>
            </TableRow>
            <TableRow>
              <TableCell  align='left'
                          variant='footer'>
                <FormControl className={this.props.classes.formControl}>
                  <InputLabel htmlFor="role-filter">Filter Role</InputLabel>
                  <Select
                    value = {this.state.filter}
                    onChange = {this.handleChangeFilter}
                    inputProps={{
                      name: 'role',
                      id: 'role-filter',
                    }}
                  >
                    <MenuItem value=''>All</MenuItem>
                    <MenuItem value='User'>User</MenuItem>
                    <MenuItem value='Moderator'>Moderator</MenuItem>
                    <MenuItem value='Admin'>Admin</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell  align='left'
                          variant='footer'>
                <FormControl className={this.props.classes.formControl}>
                  <TextField
                    label="Search"
                    value={this.state.search}
                    onChange={this.handleChangeSearch}
                  />
                </FormControl>
              </TableCell>
            </TableRow>      
          </TableFooter>
        </Table>
        <Button
          variant="contained"
          color="primary"
          className={this.props.classes.button}
          onClick={this.HandleSubmit}
        >
          Submit
        </Button>
      </Paper>
    );
  }
}

export default withToastManager(withStyles(styles)(AccessManagement));
