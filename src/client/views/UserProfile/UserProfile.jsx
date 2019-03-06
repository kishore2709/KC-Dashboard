import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
// import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardAvatar from 'components/Card/CardAvatar.jsx';
import CardBody from 'components/Card/CardBody.jsx';

// core components
import UserProfileForm from 'components/Forms/UserProfileForm.jsx';
import avatar from 'assets/img/faces/avartabus.png';
// redux
import { connect } from 'react-redux';
import { load as loadAccount } from '_reducers/AIO/userData.reducer.js';
import { GetUserInfo } from '_helpers/Utils/index.js';
import { PostApi } from '_helpers/Utils';
// noti
import { withToastManager } from 'react-toast-notifications';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.user = GetUserInfo();
  }

  handleSubmit(e) {
    const { user } = this;
    const { toastManager } = this.props;
    // console.log(e);
    if ('oldPassword' in e && 'newPassword' in e)
      PostApi('/api/users/changePassword', { ...e, id: user._id })
        .then(ret => {
          console.log(ret);
          if (!ret || !('message' in ret)) throw new Error('err');
          // this.props.addTable(ret);
          toastManager.add('Change password Successfully', {
            appearance: 'success',
            autoDismiss: true,
          });

          this.user.token = ret.message;
          this.user.changePwd = false;
          localStorage.setItem('user', JSON.stringify(this.user));
        })
        .catch(err => {
          console.log(err);
          toastManager.add(`Change Password Failed!`, {
            appearance: 'error',
            autoDismiss: true,
          });
        });
    if (
      'fullname' in e &&
      'phonenumber' in e &&
      'email' in e &&
      'username' in e
    ) {
      const { fullname, phonenumber, email, username } = e;
      PostApi('/api/users/updateDb', [
        { fullname, phonenumber, email, username, id: user._id },
      ])
        .then(ret => {
          console.log(ret);
          if (ret === 'err') throw new Error('wrong');
          if (!ret || !('message' in ret)) throw new Error('err');
          // this.props.addTable(ret);
          toastManager.add('Update infomation Successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
        })
        .catch(err => {
          console.log(err);
          toastManager.add(`Update infomation Failed!`, {
            appearance: 'error',
            autoDismiss: true,
          });
        });
    }
  }

  render() {
    const { classes, load } = this.props;
    console.log('in userprofile');
    // const user = GetUserInfo();
    const { username, role, status, fullname, phonenumber, email } = this.user;
    load({ username, role, status, fullname, phonenumber, email });
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Sửa thông tin</h4>
              <p className={classes.cardCategoryWhite}>
                Chỉnh sửa thông tin cá nhân của bạn
              </p>
            </CardHeader>
            <CardBody>
              <UserProfileForm onSubmit={this.handleSubmit.bind(this)} />;
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>{fullname}</h6>
              <h4 className={classes.cardTitle}>{username}</h4>
              <p className={classes.description}>
                
              </p>
              <Button color="primary" round>
                Theo dõi
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  load: newStatus => {
    dispatch(loadAccount(newStatus));
  },
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(withToastManager(UserProfile)));
