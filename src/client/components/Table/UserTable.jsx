import React from 'react';
import MUIDataTable from 'mui-datatables';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/BorderColor';
import IconButton from '@material-ui/core/IconButton';
import UserDialog from 'components/Dialogs/UserDialog.jsx';
import { PostApi } from '_helpers/Utils';
import { dialogActions } from '_actions';
import { connect } from 'react-redux';
import CustomFooter from './CustomFooter.jsx';

class UserTable extends React.Component {
  state = {
    openDialog: false,
    rows: [],
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
        this.setState({ rows: result });
      })
      .catch(err => {
        console.log('get data from database err');
      });
  }

  render() {
    const { add, update } = this.props;
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
                const {
                  fullname,
                  email,
                  phonenumber,
                  role,
                  status,
                  username,
                  id,
                } = this.state.rows[tableMeta.rowIndex];
                update({
                  fullname,
                  email,
                  phonenumber,
                  role,
                  status,
                  username,
                  id,
                });
                this.setState({ openDialog: true });
              }}
            >
              <EditIcon />
            </IconButton>
          ),
        },
      },
    ];

    const data = this.state.rows.map(val => {
      const { fullname, email, phonenumber, role, status, username, id } = val;
      return [fullname, username, role, status, true];
    });

    const options = {
      filter: true,
      selectableRows: true,
      filterType: 'dropdown',
      responsive: 'stacked',
      customFooter: (
        count,
        page,
        rowsPerPage,
        changeRowsPerPage,
        changePage
      ) => (
        <CustomFooter
          changePage={changePage}
          count={count}
          onClick={() => {
            // console.log(tableMeta);
            this.setState({ openDialog: true });
          }}
        />
      ),
    };

    return (
      <React.Fragment>
        <UserDialog open={this.state.openDialog} />
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
});
export default connect(
  null,
  mapDispatchToProps
)(UserTable);
