import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// core
// redux-form
import { dialogActions } from '_actions';
// import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import DialogFormAIML from './DialogFormSecond.jsx';
// styles

const styles = theme => ({
  border: {
    border: '3px solid red',
    borderRadius: '15px',
  },
});
class DialogFormComponent extends React.Component {
  handleClose() {
    this.props.dialogAIMLFunc({ open: false, message: [], id: 0 });
  }

  render() {
    const { dialog, classes } = this.props;
    const { open, id } = dialog.dialogAIMLSecond;
    // console.log(open, message);
    // console.log(classes.dialog);
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Gợi ý</DialogTitle>
        <DialogContent>
          <DialogFormAIML
            onSave={e => {
              // console.log(e);
              this.props.onSubmit({e, id});
              this.handleClose();
            }}
            onCancel={() => {
              this.handleClose();
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dialogAIMLFunc: newStatus => {
    dispatch(dialogActions.dialogAIMLSecond(newStatus));
  },
});

export default connect(
  state => ({
    dialog: state.dialog,
  }),
  mapDispatchToProps
)(withStyles(styles)(DialogFormComponent));
