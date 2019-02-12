import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
// import Input from '@material-ui/core/Input';
import { checkPassStrength } from '_helpers/Utils';

import { connect } from 'react-redux';
// import { getNormalizedScrollLeft } from 'normalize-scroll-left';
// import asyncValidate from './asyncValidate';
// import { load as loadAccount } from '../../_reducers/UserData.reducer.js/index.js';
// import
const validate = values => {
  const errors = {};
  const requiredFields = ['fullname', 'username', 'email', 'role', 'status'];
  // console.log('in validate..');
  // console.log(values);
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
    if (
    values.oldPassword ||
    values.newPassword ||
    values.confirmNewPassword
  ) {
    if (!values.oldPassword) errors.oldPassword = 'Required';
    if (!values.newPassword) errors.oldPassword = 'Required';
    if (!values.confirmNewPassword) errors.oldPassword = 'Required';
    if (values.newPassword !== values.confirmNewPassword) {
      errors.confirmNewPassword = 'newPassword must match';
    }
  }
  return errors;
};

const warn = values => {
  const warnings = {}
  let score = checkPassStrength(values.newPassword);
  warnings.newPassword = score;
  return warnings;
}
const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    variant="outlined"
    {...input}
    {...custom}
  />
);

const renderPasswordField = ({
  label,
  input,
  meta: { touched, invalid, error, warning },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && (error || warning)}
    variant="outlined"
    type="password"
    autoComplete="current-password"
    InputLabelProps={{
      shrink: true,
    }}
    fullWidth
    {...input}
    {...custom}
  />
);

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error}>
    <InputLabel shrink htmlFor={`${label}-native-simple`}>
      {label}
    </InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: label,
        id: label,
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);

// eslint-disable-next-line import/no-mutable-exports
let UserProfileForm = props => {
  const { handleSubmit, pristine, reset, submitting, classes } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={4}>
          <Field
            name="username"
            component={renderTextField}
            label="Username"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            name="role"
            component={renderTextField}
            label="role"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            name="status"
            component={renderTextField}
            label="status"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            name="fullname"
            component={renderTextField}
            label="Full Name"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            name="phonenumber"
            component={renderTextField}
            label="Phonenumber"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field name="email" component={renderTextField} label="Email" />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Field
            name="oldPassword"
            component={renderPasswordField}
            label="oldPassword"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Field
            name="newPassword"
            component={renderPasswordField}
            label="newPassword"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Field
            name="confirmNewPassword"
            component={renderPasswordField}
            label="confirmNewPassword"
          />
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <button
                className="blue button"
                type="submit"
                disabled={pristine || submitting}
              >
                {props.dialog.new ? 'Add' : 'Submit'}
              </button>
            </Grid>
            <Grid item>
              <button
                className="blue button"
                type="button"
                onClick={() => {
                  props.onCancel();
                }}
              >
                Cancel
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

UserProfileForm = reduxForm({
  form: 'UserProfileForm', // a unique identifier for this form
  validate,
  warn,
})(UserProfileForm);

UserProfileForm = connect(state => ({
  initialValues: state.userDialogData.data, // pull initial values from account reducer
  dialog: state.dialog,
}))(UserProfileForm);

export default UserProfileForm;
