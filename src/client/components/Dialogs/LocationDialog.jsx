import React from "react";
// import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import withStyles from "@material-ui/core/styles/withStyles";

// /
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { connect } from "react-redux";
import { load as loadLocation } from "_reducers/AIO/locationData.reducer.js";
import { PostApi } from "_helpers/Utils";
import { locationTableActions, locationDialogActions } from "_actions";
import { withToastManager } from "react-toast-notifications";
import { locationDialogConstants } from "_constants";
import AddLocationForm from "./AddLocationForm.jsx";

const styles = theme => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
    width: "100%"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    width: "100%"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    display: "flex",
    flexWrap: "wrap"
  }
});

class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleOnResetPassword = this.handleOnResetPassword.bind(this);
  }

  componentWillReceiveProps(props) {
    if ("open" in props && props.open) this.setState({ open: true });
  }

  handleClose = () => {
    // this.setState({ open: false });
    // this.props.onClose();
    this.props.closeDialog(false);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit(e) {
    // const { user } = this;
    const { toastManager } = this.props;
    console.log('Update data', e);
    this.handleClose();
    /*
    if (
      // "oldPassword" in e &&
      // "newPassword" in e &&
      "fullname" in e &&
      "phonenumber" in e &&
      "email" in e &&
      "username" in e
    )
      PostApi("/api/users/updateDb", e )
        .then(ret => {
          console.log("in updatedb res..");
          console.log(ret);
          if (!ret || !("message" in ret) || !Array.isArray(ret.message))
            throw new Error("err");
          // this.props.addTable(ret);
          toastManager.add("Cập nhật thông tin thành công", {
            appearance: "success",
            autoDismiss: true
          });
          this.props.updateTable(e);
        })
        .catch(err => {
          console.log(err);
          toastManager.add(`Cập nhật thông tin bị lỗi!`, {
            appearance: "error",
            autoDismiss: true
          });
        }).then(() => {this.handleClose()});
    */
  }
/*
  handleOnResetPassword(e) {
    const { toastManager } = this.props;
    console.log(" on ResetPassword");
    PostApi("/api/users/resetPassword", e)
      .then(ret => {
        // console.log('in response');
        // console.log(ret);
        // this.props.addTable(ret);
        toastManager.add("Đặt lại mật khẩu ngẫu nhiên thành công", {
          appearance: "success",
          autoDismiss: true
        });
      })
      .catch(err => {
        console.log("err");
        toastManager.add(`Thao tác gặp lỗi!!`, {
          appearance: "error",
          autoDismiss: true
        });
      })
      .then(ret => {
        this.handleClose();
      });
    // this.handleClose();
  }
*/

  render() {
    const { load, dialog, classes } = this.props;
    if (!dialog.new) {
      const {
        locName,
        location,
        dataSource,
      } = dialog.message;
      // load initial data to Dialog
      load({
        locName,
        location,
        dataSource,
      });
    }
    // console.log('??? in UserDialog');
    // console.log({ fullname, email, phonenumber, role, status, username, id });
    return (
      <div>
        <Dialog
          fullWidth
          open={dialog.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          disableBackdropClick
        >
          <DialogContent>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitleWhite}>Sửa thông tin</h4>
                    <p className={classes.cardCategoryWhite}>
                      Chỉnh sửa thông tin vị trí
                    </p>
                  </CardHeader>
                  <CardBody>
                    <AddLocationForm
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

function mapStateToProps(state) {
  const { locationDialog } = state;
  const dialog = locationDialog;
  return {
    dialog
  };
}

const mapDispatchToProps = dispatch => ({
  load: newStatus => {
    dispatch(loadLocation(newStatus));
  },
  updateTable: newStatus => {
    dispatch(locationTableActions.update(newStatus));
  },
  addTable: newStatus => {
    dispatch(locationTableActions.add(newStatus));
  },
  closeDialog: newStatus => {
    dispatch(locationDialogActions.closeDialog(newStatus));
  }
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withToastManager(FormDialog))
);
