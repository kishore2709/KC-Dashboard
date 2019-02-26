import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ReactTooltip from 'react-tooltip';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { aimlActions } from '_actions';
import IconButton from '@material-ui/core/IconButton';
import HighlightOff from '@material-ui/icons/HighlightOff';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

const styles = theme => ({
  btn: {
    border: '2px solid black',
    backgroundColor: 'white',
    color: 'black',
    padding: '4px 10px',
    fontSize: '18px',
    cursor: 'pointer',
    '&:hover': {
      background: '#2196F3',
      color: 'white',
    },
    '&:disabled': {
      border: '1px solid #999999',
      backgroundColor: '#cccccc',
      color: '#666666',
    },
  },
  info: {
    borderColor: '#2196F3',
    color: 'dodgerblue',
  },
  danger: {
    borderColor: '#f44336',
    color: 'red',
    '&:hover': {
      background: '#f44336',
      color: 'white',
    },
  },

  card: {
    margin: '15px 5px 15px 5px',
    border: '1px solid black',
  },
  cardHeader: {
    // border: '1px solid black',
    background: '#47A6EB',
    boxSizing: 'border-box',
    height: '20px',
    color: 'black',
    textAlign: 'center',
  },
  title: {
    // border: '1px solid black',
    // boxSizing: 'border-box',
    height: 'auto',
    color: 'black',
    fontSize: '18px',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 'auto',
  },
  titleAnswer: {
    // border: '1px solid black',
    // boxSizing: 'border-box',
    height: 'auto',
    color: 'black',
    fontSize: '18px',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
  },
  input: {
    border: '1px solid black',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '14px',
    height: '30px',
    padding: '2px',
    width: '100%',
  },
  cardContent: {
    // border: '1px solid black',
    boxSizing: 'border-box',
    display: 'flex',
  },
  container: {
    display: 'flex',
  },
  children: {
    margin: 'auto',
  },
  childrenQ: {
    marginRight: '25px',
    width: '100%',
  },
  childrenA: {
    marginLeft: '25px',
    width: '100%',
  },
  /* image */
});

const renderFieldAnswer = ({
  index,
  classes,
  formState,
  input,
  label,
  type,
  meta: { touched, error },
}) => (
  // console.log(formState);
  // if (formState.disableArray) console.log(formState.disableArray[index]);
  <React.Fragment>
    <input
      {...input}
      type={type}
      data-tip=""
      data-for={label}
      className={classes.input}
      placeholder={touched && error ? error : ''}
    />

    <ReactTooltip id={label}>
      {formState && formState.values && formState.values.answers
        ? formState.values.answers
        : ''}
    </ReactTooltip>
  </React.Fragment>
);

const renderField = ({
  index,
  QA,
  classes,
  formState,
  input,
  label,
  type,
  meta: { touched, error },
}) => (
  // console.log(formState);
  // if (formState.disableArray) console.log(formState.disableArray[index]);
  <React.Fragment>
    <input
      {...input}
      type={type}
      data-tip=""
      data-for={label}
      className={classes.input}
      placeholder={touched && error ? error : ''}
      disabled={
        QA == 'A' && formState.disableArray && formState.disableArray[index]
      }
    />

    <ReactTooltip id={label}>
      {formState && formState.values && formState.values.members[index]
        ? formState.values.members[index][QA]
        : ''}
    </ReactTooltip>
  </React.Fragment>
);

const renderMembers = ({
  submitting,
  valid,
  dirty,
  formState,
  fields,
  classes,
  meta: { error, submitFailed },
}) => {
  // fields.push();

  if (fields.length === 0) fields.push();
  console.log(fields);
  return (
    // console.log(submitting, valid, dirty);
    <Grid container direction="row" alignItems="center">
      <Grid item xs={1} />
      <Grid item xs={5} className={classes.container}>
        <Typography className={classes.title}>Câu hỏi đầy đủ</Typography>
      </Grid>
      <Grid item xs={5} className={classes.container}>
        <Typography className={classes.title}>Pattern</Typography>
      </Grid>
      <Grid item xs={1} />
      {fields.map((member, index) => (
        <React.Fragment>
          <Grid item xs={1} className={classes.container}>
            <IconButton
              aria-label="Add"
              className={classes.children}
              onClick={() => fields.push()}
              disabled={(submitting || !valid) && dirty}
            >
              <AddCircleOutline />
            </IconButton>
          </Grid>
          <Grid item xs={5} className={classes.container}>
            <div className={classes.childrenQ}>
              <Field
                name={`${member}.Q`}
                label={`${member}.Q`}
                component={renderField}
                props={{ classes, formState, index, QA: 'Q' }}
              />
            </div>
          </Grid>
          <Grid item xs={5} className={classes.container}>
            <div className={classes.childrenA}>
              <Field
                name={`${member}.A`}
                label={`${member}.A`}
                component={renderField}
                props={{ classes, formState, index, QA: 'A' }}
              />
            </div>
          </Grid>
          <Grid item xs={1} className={classes.container}>
            <IconButton
              aria-label="Delete"
              className={classes.children}
              onClick={() => {
                if (fields.length > 1) fields.remove(index);
              }}
            >
              <HighlightOff />
            </IconButton>
          </Grid>
        </React.Fragment>
      ))}
      <Grid item xs={12}>
        {submitFailed && error && <span>{error}</span>}
      </Grid>
    </Grid>
  );
};
class Questions extends React.Component {
  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      reset,
      submitting,
      formState,
      questionToAIML,
      valid,
      dirty,
      aiml, // aiml redux
    } = this.props;
    // console.log(values);
    // console.log('fieldList ', fieldList, values);
    const { topic: topicname } = aiml;
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit}>
          <Card className={classes.card}>
            <CardContent>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} className={classes.cardContent}>
                  <FieldArray
                    name="members"
                    component={renderMembers}
                    props={{ classes, formState, submitting, valid, dirty }}
                  />
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                >
                  <Grid item>
                    <button
                      className={`${classes.btn} ${classes.info}`}
                      onClick={e => {
                        e.preventDefault();
                        // console.log(formState.activeIndex);
                        // formState.values.members[index][QA]
                        const { activeIndex, values } = formState;
                        questionToAIML({
                          textquestion: values.members[activeIndex].Q,
                          topicname,
                          id: activeIndex,
                        });
                      }}
                      disabled={submitting}
                    >
                      Kiểm tra/Gợi ý
                    </button>
                  </Grid>
                  <Grid item>
                    <button
                      className={`${classes.btn} ${classes.danger}`}
                      type="submit"
                      disabled={pristine || submitting}
                      onClick={reset}
                    >
                      Reset
                    </button>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* //// */}
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.titleAnswer}>
                Câu trả lời
              </Typography>

              <Field
                name="answer"
                label="answer"
                component={renderFieldAnswer}
                props={{ classes, formState }}
              />
            </CardContent>
          </Card>

          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <Button
                variant="contained"
                size="large"
                color="primary"
                type="submit"
              >
                Lưu
              </Button>
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.answer) errors.answer = 'Required';
  if (!values.members || !values.members.length) {
    errors.members = { _error: 'Ít nhất một câu hỏi phải được nhập!' };
  } else {
    const membersArrayErrors = [];
    values.members.forEach((member, memberIndex) => {
      const memberErrors = {};
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

const QuestionsForm = reduxForm({
  form: 'QuestionsForm',
  validate,
})(Questions);

export default connect(
  state => ({
    formState: state.form.QuestionsForm,
    aiml: state.aiml,
  }),
  dispatch => ({
    questionToAIML: newStatus => {
      dispatch(aimlActions.questionToAIML(newStatus));
    },
  })
)(withStyles(styles)(QuestionsForm));
