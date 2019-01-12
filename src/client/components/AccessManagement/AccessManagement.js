/* eslint-disable react/no-multi-comp */
import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { GetUserInfo, PostApi } from '../../_helpers/Utils';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 4,
  },
});

class CoordinateCheckbox extends React.Component {
  render() {
    return (
      <Checkbox
        onChange={(event, checked) =>
          this.props.onChange(event, checked, this.props.row, this.props.col)
        }
      />
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
    };
    this.promiseState = this.promiseState.bind(this);
    this.GetAllUsers = this.GetAllUsers.bind(this);
    this.GetAllTabs = this.GetAllTabs.bind(this);
    this.SetupRows = this.SetupRows.bind(this);
    this.SetupColumns = this.SetupColumns.bind(this);
    this.SetupAccessMatrix = this.SetupAccessMatrix.bind(this);
    this.HandleChange = this.HandleChange.bind(this);
    this.HandleSubmit = this.HandleSubmit.bind(this);
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
    const accessMatrix = Array.from(this.state.users, () =>
      Array.from(this.state.tabs, () => false)
    );
    this.setState({ accessMatrix }, () => {
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
    const result = this.state.users.map((user, index) => ({
      accessArr: this.state.accessMatrix[index].slice(),
      id: user.id,
    }));
    console.log(result);
  }

  render() {
    const { tabs, users } = this.state;
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
            {users.map(row => (
              <TableRow key={row.row_id}>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                {tabs.map(col => (
                  <TableCell key={col.col_id} align="center">
                    <CoordinateCheckbox
                      row={row.row_id}
                      col={col.col_id}
                      onChange={this.HandleChange}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
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

export default withStyles(styles)(AccessManagement);
