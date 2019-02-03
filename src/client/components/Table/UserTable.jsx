import React from 'react';
import MUIDataTable from 'mui-datatables';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/BorderColor';
import IconButton from '@material-ui/core/IconButton';

class UserTable extends React.Component {
  render() {
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
          customBodyRender: (value, tableMeta, updateValue) => (
            <FormControlLabel
              label={value ? 'Yes' : 'No'}
              value={value ? 'Yes' : 'No'}
              control={
                <Switch
                  color="primary"
                  checked={value}
                  value={value ? 'Yes' : 'No'}
                />
              }
            />
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
                console.log(tableMeta);
              }}
            >
              <EditIcon />
            </IconButton>
          ),
        },
      },
    ];

    const data = [
      ['Robin Duncan', 'TomPython', 'Admin', false, true],
      ['Mel Brooks', 'Huanthemank55', 'User', true, true],
    ];

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'scroll',
    };

    return (
      <MUIDataTable
        title="Danh sách người dùng"
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}
export default UserTable;
