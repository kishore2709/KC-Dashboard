import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withToastManager } from 'react-toast-notifications';
import { DataTypeProvider, EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import md5 from 'md5';
import { PostApi } from '../../_helpers/Utils';

const getRowId = row => row.id;

const RoleFormatter = ({ value }) => <Chip label={value} />;

const RoleEditor = ({ value, onValueChange }) => (
  <Select
    input={<Input />}
    value={value}
    onChange={event => onValueChange(event.target.value)}
    style={{ width: '100%' }}
  >
    <MenuItem value="Admin">Admin</MenuItem>
    <MenuItem value="Moderator">Moderator</MenuItem>
    <MenuItem value="User">User</MenuItem>
  </Select>
);

const RoleTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={RoleFormatter}
    editorComponent={RoleEditor}
    {...props}
  />
);

const BooleanFormatter = ({ value }) => (
  <Chip label={value ? 'Active' : 'Inactive'} />
);

const BooleanEditor = ({ value, onValueChange }) => (
  <Select
    input={<Input />}
    value={value ? 'Active' : 'Inactive'}
    onChange={event => onValueChange(event.target.value === 'Active')}
    style={{ width: '100%' }}
  >
    <MenuItem value="Active">Active</MenuItem>
    <MenuItem value="Inactive">Inactive</MenuItem>
  </Select>
);

const BooleanTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={BooleanFormatter}
    editorComponent={BooleanEditor}
    {...props}
  />
);

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    const { toastManager } = this.props;
    this.state = {
      columns: [
        { name: 'username', title: 'Username' },
        { name: 'password', title: 'Password' },
        { name: 'role', title: 'Role' },
        { name: 'status', title: 'Status', dataType: 'boolean' },
      ],
      booleanColumns: ['status'],
      roleColumns: ['role'],
      rows: [
        {
          id: 1,
          username: 'mikelhpdatke',
          password: 'abc@123',
          role: 'Admin',
          status: true,
        },
        {
          id: 2,
          username: 'ad',
          password: 'aa@123',
          role: 'dd',
          status: true,
        },
      ],
    };

    this.commitChanges = ({ added, changed, deleted }) => {
      let { rows } = this.state;
      const alertErr = () => {
        toastManager.add(`Something went wrong: `, {
          appearance: 'error',
          autoDismiss: true,
        });
      };
      if (added) {
        // console.log(added);
        added.forEach(x => {
          if (!('status' in x)) x.status = false;
          const { password, ...rest } = x;
          // console.log(x);
          PostApi('/api/users/addDb', { password: md5(password), ...rest })
            .then(res => {
              console.log(res);
              if (res === 'err') {
                alertErr();
                return 'err';
              }
              const { _id: id, ...restTwo } = res;
              res = { id, ...restTwo };
              const newAdd = [res];
              console.log(newAdd);
              const startingAddedId =
                rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
              rows = [
                ...rows,
                ...newAdd.map((row, index) => ({
                  id: startingAddedId + index,
                  ...row,
                })),
              ];
              this.setState({ rows }, () => {
                toastManager.add('Added Successfully', {
                  appearance: 'success',
                  autoDismiss: true,
                });
              });
            })
            .catch(err => {
              console.log('added data from database err', err);
              alertErr();
            });
        });
      }
      if (changed) {
        const asyncUpdateFunction = async function delFunc(rows) {
          const ret = [];
          await Promise.all(
            rows.map(async row => {
              if (changed[row.id]) {
                let newRow = { ...row, ...changed[row.id] };
                const { password, ...rest } = newRow;
                newRow = { password: md5(password), ...rest };
                console.log(newRow);
                await PostApi('/api/users/updateDb', newRow)
                  .then(res => {
                    // console.log('in then proomse');
                    if (res === 'err') {
                      alertErr();
                      ret.push(row);
                      // ret = 'err';
                    } else {
                      ret.push(newRow);
                      toastManager.add('Updated Successfully', {
                        appearance: 'success',
                        autoDismiss: true,
                      });
                    }
                  })
                  .catch(err => {
                    // ret = 'err';
                    ret.push(row);
                    console.log('update data from database err');
                    alertErr();
                  });
                // console.log(ret);
                // return ret;
                // return { ...row, ...changed[row.id] };
              } else {
                ret.push(row);
              }
            })
          );
          console.log(ret);
          return ret;
        };
        asyncUpdateFunction(rows).then(ret => {
          if (ret !== 'err') this.setState({ rows: ret });
        });
      }
      if (deleted) {
        // console.log(deleted);
        const deletedSet = new Set(deleted);
        const asyncDeleteFunction = async function delFunc(rows) {
          const ret = [];
          // let status = true;
          await Promise.all(
            rows.map(async row => {
              if (deletedSet.has(row.id)) {
                await PostApi('/api/users/deleteDb', row)
                  .then(res => {
                    if (res === 'err') {
                      alertErr();
                      ret.push(row);
                      return 'err';
                    }
                    // status = false;
                    toastManager.add('Deleted Successfully', {
                      appearance: 'success',
                      autoDismiss: true,
                    });
                  })
                  .catch(err => {
                    console.log('delete data from database err');
                    ret.push(row);
                    alertErr();
                  });
              } else {
                // console.log(row);
                ret.push(row);
              }
              // return true;
            })
          );
          console.log(ret);
          return ret;
        };
        asyncDeleteFunction(rows).then(res => this.setState({ rows: res }));
      }
    };
  }

  componentWillMount() {
    PostApi('/api/users/getUsers', {})
      .then(res => {
        console.log(res);
        const result = res.map(x => {
          const { _id, ...rest } = x;
          return { id: _id, ...rest };
        });
        // console.log(res);
        this.setState({ rows: result });
      })
      .catch(err => {
        console.log('get data from database err');
      });
  }

  render() {
    const { rows, columns, booleanColumns, roleColumns } = this.state;

    return (
      <Paper>
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <BooleanTypeProvider for={booleanColumns} />
          <RoleTypeProvider for={roleColumns} />
          <EditingState
            onCommitChanges={this.commitChanges}
            defaultEditingRowIds={[0]}
          />
          <Table />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
        </Grid>
      </Paper>
    );
  }
}
export default withToastManager(Demo);
