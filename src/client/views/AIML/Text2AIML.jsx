import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// redux-form
import { Field, reduxForm, FieldArray, change } from 'redux-form';
import { connect } from 'react-redux';
// import { load as loadAccount } from '_reducers/AIO/userData.reducer.js';
// noti
import { withToastManager } from 'react-toast-notifications';
// core
import TextField from '@material-ui/core/TextField';

// icon
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
// import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
// import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { dialogActions, aimlActions } from '_actions';
// custom Component Card
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import { load as loadAccount } from '_reducers/AIO/aiml.reducer.js';
import { PostApiForm, ip } from '_helpers/Utils';
//
// loader
import Loadable from 'react-loadable';
import TableLoader from 'components/ContentLoader/TableLoader.jsx';

// import DialogSecond from './Dialog2/DialogSecond.jsx';
const DialogSecond = Loadable({
  loader: () => import(/* webpackPreload: true */ './Dialog2/DialogSecond.jsx'),
  loading: TableLoader,
});
// import Dialog from './Dialog1/Dialog.jsx';
const Dialog = Loadable({
  loader: () => import(/* webpackPreload: true */ './Dialog1/Dialog.jsx'),
  loading: TableLoader,
});
//
const styles = theme => ({
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
  Text2AIML: {
    marginBottom: '0px',
  },
  border: {
    border: '3px solid red',
    borderRadius: '15px',
  },
  container: {
    display: 'flex',
    alignContent: 'center',
    justify: 'center',
  },
  item: {
    margin: 'auto',
  },
});

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  // input.value=''
  <TextField
    error={touched && invalid}
    helperText={touched && error}
    variant="outlined"
    fullWidth
    InputLabelProps={{
      shrink: true,
    }}
    {...input}
    {...custom}
  />
);

const renderMembers = params => {
  // console.log(params);
  const {
    fields,
    dialogAIMLFunc,
    topicname,
    saveCurrentQuestionAIML,
    meta: { error, submitFailed },
  } = params;
  return (
    <Grid container spacing={24}>
      {fields.map((member, index) => (
        <Grid item xs={12} key={index}>
          <Grid container direction="row" alignItems="center">
            <Grid
              item
              xs={1}
              style={{
                display: 'flex',
                alignContent: 'center',
                justify: 'center',
              }}
            >
              <IconButton
                aria-label="Delete"
                onClick={() => fields.remove(index)}
                style={{ margin: 'auto' }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={5}
              style={{
                display: 'flex',
                alignContent: 'center',
                justify: 'center',
              }}
            >
              <Field
                style={{ margin: 'auto' }}
                name={`${member}.Q`}
                component={renderTextField}
                onKeyPress={ev => {
                  // console.log(`Pressed keyCode ${ev.key}`);
                  if (ev.key === 'Enter') {
                    // Convert Text 2 AIML
                    // console.log('in Enter',ev.target.value);
                    PostApiForm(`${ip.server  }/aimlquestions/getaimlfromtext`, {
                      textquestion: ev.target.value,
                    })
                      .then(res => {
                        console.log(res);
                        if (!res || !('aiml_pattern' in res))
                          throw new Error('err');
                        // Save current AIML Question
                        saveCurrentQuestionAIML(res.aiml_pattern);
                        // Show cau hoi tuong tu trong Dialog1
                        PostApiForm(
                          `${ip.server  }/aimlquestions/getsimilarpatternindb`,
                          { aimlpatternfromtext: res.aiml_pattern, topicname }
                        ).then(res => {
                          if (!res || !(Array.isArray(res))) throw new Error('err');
                          // console.log('in []', res);
                          // console.log(res);
                          dialogAIMLFunc({
                            open: true,
                            message: res,
                            id: index,
                          });
                        });
                      })
                      .catch(err => {
                        console.log(err);
                      });

                    ev.preventDefault();
                  }
                }}
              />
            </Grid>

            <Grid
              item
              xs={6}
              style={{
                display: 'flex',
                alignContent: 'center',
                justify: 'center',
              }}
            >
              <Field
                style={{ margin: 'auto' }}
                name={`${member}.A`}
                component={renderTextField}
              />
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <Fab
              size="small"
              color="secondary"
              aria-label="Add"
              onClick={() => fields.push({})}
            >
              <AddIcon />
            </Fab>
            {submitFailed && error && <span>{error}</span>}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

class Text2AIML extends React.Component {
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      classes,
      dialogAIMLFunc,
      load,
      aiml,
      saveCurrentQuestionAIML,
    } = this.props;
    return (
      <React.Fragment>
        <Dialog
          onSubmit={({ e, id }) => {
            // console.log(e);
            console.log('?????');
            console.log(id, e);
            this.props.dispatch(change('Text2AIML', `members[${id}].A`, e));
          }}
        />
        <DialogSecond
          onSubmit={({ e, id }) => {
            // console.log(e);
            // console.log('?????');
            // console.log(id, e);
            this.props.dispatch(change('Text2AIML', `members[${id}].A`, e));
          }}
        />
        <form onSubmit={handleSubmit}>
          <Paper>
            <Grid
              container
              spacing={24}
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={6}>
                <Typography
                  className={classes.border}
                  align="center"
                  color="primary"
                  gutterBottom
                  variant="button"
                >
                  Câu hỏi đầy đủ
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={classes.border}
                  align="center"
                  color="primary"
                  gutterBottom
                  variant="button"
                >
                  Pattern
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FieldArray
                  name="members"
                  component={renderMembers}
                  props={{ dialogAIMLFunc, topicname: aiml.topic, saveCurrentQuestionAIML }}
                />
              </Grid>
              <Grid item xs={12} className={classes.container} />
              <Grid item xs={12}>
                <Card>
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitleWhite}>Câu trả lời</h4>
                  </CardHeader>
                  <CardBody>
                    <Field
                      name="answer"
                      component={renderTextField}
                      fullWidth
                    />
                  </CardBody>
                </Card>
              </Grid>
              <Grid item xs={12} className={classes.container}>
                <button
                  className={`blue button ${classes.item}`}
                  type="submit"
                  disabled={pristine || submitting}
                >
                  Save
                </button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dialogAIMLFunc: newStatus => {
    dispatch(dialogActions.dialogAIML(newStatus));
  },
  load: newStatus => {
    dispatch(loadAccount(newStatus));
  },
  saveCurrentQuestionAIML: newStatus => {
    dispatch(aimlActions.saveCurrentQuestionAIML(newStatus));
  },
});

const validate = values => {
  const errors = {};
  if (!values['answer']) errors['answer'] = 'Required';
  if (!values.members || !values.members.length) {
    errors.members = { _error: 'At least one member must be entered' };
  } else {
    const membersArrayErrors = [];
    values.members.forEach((member, memberIndex) => {
      const memberErrors = {};
      console.log(member);
      if (!member || !member.Q) {
        memberErrors.Q = 'Required';
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (!member || !member.A) {
        memberErrors.A = 'Required';
        membersArrayErrors[memberIndex] = memberErrors;
      }
    });
    if (membersArrayErrors.length) {
      errors.members = membersArrayErrors;
    }
  }
  return errors;
};

let mText2AIML = reduxForm({
  form: 'Text2AIML', // a unique identifier for this form
  validate,
  // warn,
})(Text2AIML);

mText2AIML = connect(
  state => ({
    aiml: state.aiml,
  }),
  mapDispatchToProps
)(mText2AIML);

export default withStyles(styles)(mText2AIML);
