import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

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
  title: {
    marginTop: '15px',
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
        fullWidth
        maxWidth="sm"
      >
        <Typography
          align="center"
          color="primary"
          variant="title"
          className={classes.title}
        >
          Gợi ý
        </Typography>
        <DialogContent>
          <DialogFormAIML
            onSave={e => {
              // console.log(e);
              this.props.onSubmit({ e, id });
              this.handleClose();
            }}
            onCancel={() => {
              this.handleClose();
              this.props.onCancel({ id });
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
)(withStyles(styles)(withMobileDialog()(DialogFormComponent)));
