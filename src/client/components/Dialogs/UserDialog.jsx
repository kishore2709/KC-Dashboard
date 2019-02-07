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
import MUIForm from './MUIForm';

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
  state = {
    open: false,
  };

  componentWillReceiveProps(props) {
    if ('open' in props && props.open) this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
    // this.props.onClose();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, dialog } = this.props;
    const {
      fullname,
      email,
      phonenumber,
      role,
      status,
      username,
      id,
    } = dialog.message;
    // console.log('??? in UserDialog');
    // console.log({ fullname, email, phonenumber, role, status, username, id });
    return (
      <div>
        <Dialog
          fullWidth
          open={this.state.open}
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
                      Chỉnh sửa thông tin cá nhân
                    </p>
                  </CardHeader>
                  <CardBody>
                    <MUIForm
                      onSubmit={e => {
                        console.log(e);
                      }}
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
  const { dialog } = state;
  return {
    dialog,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(FormDialog));
