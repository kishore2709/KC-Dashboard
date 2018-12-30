import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { DataTypeProvider, EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';

import { generateRows, globalSalesValues } from '../../demo-data/generator';

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

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

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
          username: 'mikelhpdatke',
          password: 'abc@123',
          role: 'Admin',
          status: true,
        },
      ],
    };

    this.commitChanges = ({ added, changed, deleted }) => {
      let { rows } = this.state;
      if (added) {
        const startingAddedId =
          rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
        rows = [
          ...rows,
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row,
          })),
        ];
      }
      if (changed) {
        rows = rows.map(row =>
          changed[row.id] ? { ...row, ...changed[row.id] } : row
        );
      }
      if (deleted) {
        const deletedSet = new Set(deleted);
        rows = rows.filter(row => !deletedSet.has(row.id));
      }
      this.setState({ rows });
    };
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
