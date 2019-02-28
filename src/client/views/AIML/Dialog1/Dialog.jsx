import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
// core
// redux-form
import { dialogActions } from '_actions';
// import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { PostApiForm, ip } from '_helpers/Utils';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import DialogFormAIML from './DialogForm.jsx';

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
  handleClose = () => {
    console.log('in close dialog 1');
    this.props.dialogAIMLFunc({ open: false, message: [], id: 0 });
  };

  render() {
    const { dialog, classes, aiml, dialogAIMLFuncSecond } = this.props;
    const { open, id } = dialog.dialogAIML;
    const { curAIML, topic: topicname } = aiml;
    // console.log(open, message);
    // console.log(classes.dialog);
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <Typography
          align="center"
          color="primary"
          variant="title"
          className={classes.title}
        >
          Các mẫu đã có
        </Typography>
        <DialogContent>
          <DialogFormAIML
            onSave={e => {
              // console.log(e);
              this.handleClose();
              this.props.onSubmit({ e, id });
            }}
            onCancel={() => {
              this.handleClose();
              // Neu ko chon o Dialog 1 -> Sang goi y Dialog 2
              PostApiForm(`${ip.server}/aimlquestions/getsimilarpatternindb`, {
                aimlpatternfromtext: curAIML,
                topicname,
              }).then(res => {
                console.log(' in doalog step 2..', res);
                if (!res || !Array.isArray(res)) throw new Error('err');
                else dialogAIMLFuncSecond({ open: true, message: res, id });
              });
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dialogAIMLFunc: newStatus => {
    dispatch(dialogActions.dialogAIML(newStatus));
  },
  dialogAIMLFuncSecond: newStatus => {
    dispatch(dialogActions.dialogAIMLSecond(newStatus));
  },
});

export default connect(
  state => ({
    dialog: state.dialog,
    aiml: state.aiml,
  }),
  mapDispatchToProps
)(withStyles(styles)(withMobileDialog()(DialogFormComponent)));
