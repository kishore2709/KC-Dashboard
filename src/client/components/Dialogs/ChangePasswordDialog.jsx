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
// import { load as loadAccount } from '_reducers/AIO/userData.reducer.js';
import { PostApi } from '_helpers/Utils';
import { dialogActions } from '_actions';
import { withToastManager } from 'react-toast-notifications';
import { dialogConstants } from '_constants';
import ChangePasswordForm from 'components/Forms/ChangePasswordForm.jsx';

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

class ChangePasswordDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose = () => {
    this.props.closeDialogPwdForm(false);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit(e) {
    console.log('in handle submit change pwd form');
  }

  render() {
    const { dialog, classes } = this.props;
    return (
      <div>
        <Dialog
          fullWidth
          open={dialog.openPwdForm}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          disableBackdropClick
        >
          <DialogContent>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitleWhite}>Đổi mật khẩu</h4>
                    <p className={classes.cardCategoryWhite}>
                      Mật khẩu bao gồm tối thiểu 8 ký tự, gồm ký tự viết hoa và viết thường, chữ số từ 0 -
                      9, ký tự đặc biệt ( @, !, #, ...)
                    </p>
                  </CardHeader>
                  <CardBody>
                    <ChangePasswordForm />
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

function mapStateToProps(state) {
  const { dialog } = state;
  return {
    dialog,
  };
}

const mapDispatchToProps = dispatch => ({
  closeDialogPwdForm: newStatus => {
    dispatch(dialogActions.closeDialogPwdForm(newStatus));
  },
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withToastManager(ChangePasswordDialog))
);
