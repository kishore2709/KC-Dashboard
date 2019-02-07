import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import asyncValidate from './asyncValidate';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'favoriteColor',
    'notes',
  ];
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
  return errors;
};

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

const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={<Checkbox checked={!!input.value} onChange={input.onChange} />}
      label={label}
    />
  </div>
);

const radioButton = ({ input, ...rest }) => (
  <FormControl>
    <RadioGroup {...input} {...rest}>
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="male" control={<Radio />} label="Male" />
    </RadioGroup>
  </FormControl>
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

const MaterialUiForm = props => {
  const { handleSubmit, pristine, reset, submitting, classes } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Field name="username" component={renderTextField} label="Username" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="fullname"
            component={renderTextField}
            label="Full Name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="phonenumber"
            component={renderTextField}
            label="Phonenumber"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name="email" component={renderTextField} label="Email" />
        </Grid>

        <Grid item xs={12}>
          <Grid container direction="row" justify="space-evenly" alignItems="center">
            <Grid item>
              <Field
                classes={classes}
                name="role"
                component={renderSelectField}
                label="role"
              >
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="User">User</option>
              </Field>
            </Grid>

            <Grid item>
              <Field
                classes={classes}
                name="status"
                component={renderSelectField}
                label="status"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Field>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container direction="row" justify="space-evenly" alignItems="center">
            <Grid item>
              <button
                className="blue button"
                type="submit"
                disabled={pristine || submitting}
              >
                Submit
              </button>
            </Grid>
            <Grid item>
              <button
                className="blue button"
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
              >
                Clear Values
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
  validate,
  asyncValidate,
})(MaterialUiForm);
