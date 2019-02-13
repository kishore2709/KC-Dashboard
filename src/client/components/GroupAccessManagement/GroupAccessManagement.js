/* eslint-disable react/no-multi-comp */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withToastManager } from 'react-toast-notifications';
import { GetUserInfo, PostApi } from '../../_helpers/Utils';
import PropTypes from 'prop-types';
import DataTable from './DataTable/DataTable';
import Loading from 'components/Loading/Loading.jsx';

const styles = theme => ({
});

class GroupAccessManagement extends React.Component {
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
        <Loading />
      );
    }
    // console.log(users);
    return (
      <DataTable
        users={users}
        fireUpSubmit={this.solveHandleSubmit}
        classes={this.props.classes}
      />
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
    // console.log(newUsers);
    let dataUpdate = newUsers.map(({ id, username: groupname, permissions, role }) => ({
      id, groupname, permissions
    }))
    PostApi('/api/groups/updateDb', dataUpdate)
      .then(res => {
        if (res === 'err') {
          this.props.toastManager.add(`Something went wrong: `, {
            appearance: 'error',
            autoDismiss: true,
          });
          // console.log('update data from database err in AcessManagement');

          // ret = 'err';
        } else {
          this.props.toastManager.add('Updated group Successfully', {
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
        // console.log('update data from database err in AcessManagement');
      });
  };

  // =================

  HandleSubmit = () => {

  };

  GetAllUsers = () =>
    PostApi('/api/groups/getGroups', {})
      .then(res => {
        let result = res.map(x => {
          const { _id, ...rest } = x;
          return { id: _id, ...rest };
        });
        result = result.map(({ id, groupname, permissions }) => {
          return {
            id,
            username: groupname,
            permissions,
            role: 'user',
          }
        })
        console.log(result);
        return Promise.resolve(result);
      })
      .catch(err => {
        console.log('get data gr from database err');
      });

  // =================
}

GroupAccessManagement.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withToastManager(withStyles(styles)(GroupAccessManagement));