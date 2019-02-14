/* eslint-disable react/no-multi-comp */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withToastManager } from 'react-toast-notifications';
import PropTypes from 'prop-types';
import Loading from 'components/Loading/Loading.jsx';
import { dialogActions } from '_actions';
import { GetUserInfo, PostApi } from '../../_helpers/Utils';
import DataTable from './DataTable/DataTable';
import { connect } from 'react-redux';

const styles = theme => ({});

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
      return <Loading />;
    }
    console.log(' in render');
    console.log(users);
    return (
      <DataTable
        users={users}
        fireUpSubmit={this.solveHandleSubmit}
        classes={this.props.classes}
        onAddGroup={this.solveAddGroup}
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
    const dataUpdate = newUsers.map(
      ({ id, username: groupname, permissions, role }) => ({
        id,
        groupname,
        permissions,
      })
    );
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

  solveAddGroup = newGroup => {
    // console.log(newGroup, '///');
    PostApi('/api/groups/addDb', { groupname: newGroup })
      .then(res => {
        if (res === 'err' || !res || 'message' in res) {
          this.props.toastManager.add(`Something went wrong: `, {
            appearance: 'error',
            autoDismiss: true,
          });
          // console.log('update data from database err in AcessManagement');

          // ret = 'err';
        } else {
          this.props.toastManager.add('Add group Successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          console.log(res);
          const { _id: id, permissions, groupname: username } = res;

          // console.log('ok add');
          this.setState(
            ({ users }) => ({
              users: [
                ...users,
                {
                  id,
                  username,
                  permissions,
                  role: 'user',
                },
              ],
            }),
            () => {
              console.log(this.state);
            }
          );
        }
      })
      .catch(err => {
        // ret = 'err';
        this.props.toastManager.add(`Something went wrong: `, {
          appearance: 'error',
          autoDismiss: true,
        });
        // console.log('update data from database err in AcessManagement');
      }).then(rettt => {
        this.props.closeDialogGroup(false);
      });
  };
  // =================

  HandleSubmit = () => { };

  GetAllUsers = () =>
    PostApi('/api/groups/getGroups', {})
      .then(res => {
        let result = res.map(x => {
          const { _id, ...rest } = x;
          return { id: _id, ...rest };
        });
        result = result.map(({ id, groupname, permissions }) => ({
          id,
          username: groupname,
          permissions,
          role: 'user',
        }));
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

const mapDispatchToProps = dispatch => ({
  closeDialogGroup: newStatus => {
    dispatch(dialogActions.closeDialogGroup(newStatus));
  },
});

export default withToastManager(
  withStyles(styles)(
    connect(
      null,
      mapDispatchToProps
    )(GroupAccessManagement)
  )
);
