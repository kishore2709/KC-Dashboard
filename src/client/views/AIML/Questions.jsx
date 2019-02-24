import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
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
    border: '1px solid black',
  },
  cardHeader: {
    border: '1px solid black',
    background: '#47A6EB',
    boxSizing: 'border-box',
    height: '20px',
    color: 'black',
    textAlign: 'center',
  },
  title: {
    border: '1px solid black',
    boxSizing: 'border-box',
    height: 'auto',
    color: 'black',
    fontSize: '18px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    border: '1px solid black',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '14px',
    height: '30px',
    width: '100%',
  },
  cardContent: {
    border: '1px solid black',
    boxSizing: 'border-box',
    display: 'flex',
  },
  /* image */
});

const renderField = ({
  index,
  QA,
  classes,
  formState,
  input,
  label,
  type,
  meta: { touched, error },
}) => {
  console.log(formState);
  if (formState.disableArray) console.log(formState.disableArray[index]);
  return (
    <div>
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
        {formState && formState.values
          ? formState.values.members[index][QA]
          : ''}
      </ReactTooltip>
    </div>
  );
};
const renderMembers = ({
  submitting,
  valid,
  dirty,
  formState,
  fields,
  classes,
  meta: { error, submitFailed },
}) => {
  console.log('??');
  return (
    // console.log(submitting, valid, dirty);
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={6}>
        <Typography className={classes.title}>Câu hỏi đầy đủ</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography className={classes.title}>Pattern</Typography>
      </Grid>
      {fields.map((member, index) => (
        <React.Fragment>
          <Grid item xs={6}>
            <Field
              name={`${member}.Q`}
              label={`${member}.Q`}
              component={renderField}
              props={{ classes, formState, index, QA: 'Q' }}
            />
          </Grid>

          <Grid item xs={6}>
            <Field
              name={`${member}.A`}
              label={`${member}.A`}
              component={renderField}
              props={{ classes, formState, index, QA: 'A' }}
            />
          </Grid>
        </React.Fragment>
      ))}
      <Grid item xs={12}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => fields.push({})}
              disabled={(submitting || !valid) && dirty}
            >
              <AddIcon /> Thêm mới
            </Button>
            {submitFailed && error && <span>{error}</span>}
          </Grid>
        </Grid>
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
      submitFailed,
      error,
      valid,
      dirty,
    } = this.props;
    // console.log(values);
    // console.log('fieldList ', fieldList, values);
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit}>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} title="CÂU HỎI" />
            <CardContent>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} md={8} className={classes.cardContent}>
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
                        console.log(formState.activeIndex);
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

const QuestionsForm = reduxForm({
  form: 'QuestionsForm',
  validate,
})(Questions);

export default connect(state => ({
  formState: state.form.QuestionsForm,
}))(withStyles(styles)(QuestionsForm));
