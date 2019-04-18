import React from 'react';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from '@material-ui/core/styles/withStyles';

// /
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import { connect } from 'react-redux';
import { load as loadAccount } from '_reducers/AIO/userData.reducer.js';
import { PostApi } from '_helpers/Utils';
import { userTableActions, dialogActions } from '_actions';
import { withToastManager } from 'react-toast-notifications';
import { dialogConstants } from '_constants';
import AddUserForm from './AddUserForm';

const styles = theme => ({
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
    width: '100%',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    width: '100%',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose = () => {
    // this.setState({ open: false });
    // this.props.onClose();
    this.props.closeDialog({ type: 'addUserDialog', message: { open: false } });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit(e) {
    console.log('in handle submit');

    const { toastManager } = this.props;

    PostApi('/api/users/addDb', e)
      .then(ret => {
        this.props.addTable(ret);
        toastManager.add('Thêm thành công', {
          appearance: 'success',
          autoDismiss: true,
        });
      })
      .catch(err => {
        console.log('err');
        toastManager.add(`Thao tác gặp lỗi!!`, {
          appearance: 'error',
          autoDismiss: true,
        });
      })
      .then(ret => {
        this.handleClose();
      });
  }

  render() {
    const { classes, addUserDialog } = this.props;

    return (
      <div>
        <Dialog
          fullWidth
          open={addUserDialog.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          disableBackdropClick
        >
          <DialogContent>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitleWhite}>Thêm người dùng</h4>
                    <p className={classes.cardCategoryWhite}>
                      Điền các thông tin cơ bản
                    </p>
                  </CardHeader>
                  <CardBody>
                    <AddUserForm
                      onSubmit={this.handleSubmit}
                      onCancel={this.handleClose}
                    />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateTable: newStatus => {
    dispatch(userTableActions.update(newStatus));
  },
  addTable: newStatus => {
    dispatch(userTableActions.add(newStatus));
  },
  closeDialog: newStatus => {
    dispatch(newStatus);
  },
});

export default withStyles(styles)(
  connect(
    state => ({ addUserDialog: state.addUserDialog }),
    mapDispatchToProps
  )(withToastManager(FormDialog))
);
