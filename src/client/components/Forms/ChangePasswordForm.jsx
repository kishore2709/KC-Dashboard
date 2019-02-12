import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import {  checkPassStrength } from '_helpers/Utils';
// import { getNormalizedScrollLeft } from 'normalize-scroll-left';
// import asyncValidate from './asyncValidate';
// import { load as loadAccount } from '../../_reducers/UserData.reducer.js/index.js';
// import
const validate = values => {
  const errors = {};
  if (values.oldPassword || values.newPassword || values.confirmNewPassword) {
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
const renderPasswordField = ({
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

// eslint-disable-next-line import/no-mutable-exports
let ChangePasswordForm = props => {
  const { handleSubmit, pristine, reset, submitting, classes } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={24}>
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

ChangePasswordForm = reduxForm({
  form: 'ChangePasswordForm', // a unique identifier for this form
  validate,
  warn,
})(ChangePasswordForm);

ChangePasswordForm = connect(state => ({
  initialValues: state.userDialogData.data, // pull initial values from account reducer
  dialog: state.dialog,
}))(ChangePasswordForm);

export default ChangePasswordForm;
