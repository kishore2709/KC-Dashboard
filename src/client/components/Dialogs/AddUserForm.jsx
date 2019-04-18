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
import { connect } from 'react-redux';
// import { getNormalizedScrollLeft } from 'normalize-scroll-left';
import asyncValidate from './asyncValidate';
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
    errors.email = 'Định dạng Email không đúng';
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
    type="password"
    variant="outlined"
    fullWidth
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

// eslint-disable-next-line import/no-mutable-exports
let AddUserForm = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    classes,
    groupTable,
  } = props;
  // console.log(groupTable);
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Field
            name="username"
            component={renderTextField}
            label="Tài khoản"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="fullname"
            component={renderTextField}
            label="Tên đầy đủ"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="phonenumber"
            component={renderTextField}
            label="Số điện thoại"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name="email" component={renderTextField} label="Email" />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="password"
            component={renderPasswordField}
            label="Mật khẩu"
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
              <Field
                classes={classes}
                name="role"
                component={renderSelectField}
                label="Vai trò"
              >
                <option value="" />
                {groupTable.map(val => (
                  <option value={val.groupname}>{val.groupname}</option>
                ))}
              </Field>
            </Grid>

            <Grid item>
              <Field
                classes={classes}
                name="status"
                component={renderSelectField}
                label="status"
              >
                <option value="" />
                <option value>Hoạt động</option>
                <option value={false}>Không hoạt động</option>
              </Field>
            </Grid>
          </Grid>
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
                Thêm
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
                Huỷ
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

AddUserForm = reduxForm({
  form: 'AddUserForm', // a unique identifier for this form
  validate,
  asyncValidate,
})(AddUserForm);

AddUserForm = connect(state => ({
  initialValues: state.userDialogData.data, // pull initial values from account reducer
  dialog: state.dialog,
  groupTable: state.groupTable,
}))(AddUserForm);

export default AddUserForm;
