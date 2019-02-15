import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { dialogActions } from '_actions';

class FormDialog extends React.Component {
  state = {
    value: '',
  };

  handleClose = () => {
    this.props.closeDialogGroup(false);
  };

  handleSave = () => {
    // console.log(this.state.value);
    this.props.onSave(this.state.value);
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { dialog } = this.props;
    // console.log('??/');
    // console.log(dialog.openGroupDialog);
    return (
      <React.Fragment>
        <Dialog
          open={this.props.dialog.openGroupDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Thêm nhóm người dùng</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="groupname"
              label="Tên nhóm người dùng"
              type="text"
              fullWidth
              value={this.state.value}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Huỷ
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Lưu
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { dialog } = state;
  return { dialog };
}

const mapDispatchToProps = dispatch => ({
  closeDialogGroup: newStatus => {
    dispatch(dialogActions.closeDialogGroup(newStatus));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormDialog);
