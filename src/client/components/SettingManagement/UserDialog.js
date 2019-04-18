import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { dialogActions } from '../../_actions';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
});

class UserDialog extends Component {
  handleClose = () => {
    this.props.closeDialog(false);
  };

  handleChange(e) {
    console.log(e.target.value);
    console.log(e.target.id);
  }

  render() {
    const { dialog, classes } = this.props;
    return (
      <div>
        <Dialog
          open={dialog.message}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Đổi mật khẩu</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Mật khẩu nên được đặt gồm cả chữ hoa, chữ thường, số và ký tự đặc
              biệt!
            </DialogContentText>
            <form className={classes.form} noValidate>
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <TextField
                        id="old-password"
                        label="Old Password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                      />
                    }
                  />
                  <FormControlLabel
                    control={
                      <TextField
                        id="new-password"
                        label="New Password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                      />
                    }
                  />
                </FormGroup>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Hủy
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cập nhật
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
UserDialog.propTypes = {
  dialog: PropTypes.any.isRequired,
  closeDialog: PropTypes.any.isRequired,
};
const mapDispatchToProps = dispatch => ({
  closeDialog: newStatus => {
    dispatch(dialogActions.closeDialog(newStatus));
  },
});

function mapStateToProps(state) {
  const { dialog } = state;
  return {
    dialog,
  };
}

const ConnectedUserDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDialog);

export default withStyles(styles)(ConnectedUserDialog);
