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
        <Loading />
      );
    }
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
      }, []).map(permission => {
        console.log(permission)
        switch (permission) {
          case 'dashboard':
            return "Trang chủ";
          case "user":
            return "Người dùng";
          case "permission":
            return "Phân quyền";
          case "logmanager":
            return "Quản lý log";
          case "serivcemanager":
            return "Quản lý dịch vụ";
          case "attackreport":
            return "Cảnh báo tấn công";
          default:
            return permission;  
        }
      });
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