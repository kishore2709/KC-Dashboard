import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
// import { getNormalizedScrollLeft } from 'normalize-scroll-left';
import asyncValidate from './asyncValidate';
// import { load as loadAccount } from '../../_reducers/UserData.reducer.js/index.js';
// import
const validate = values => {
  const errors = {};
  const requiredFields = ['locName', 'location', 'dataSource'];
  // console.log('in validate..');
  // console.log(values);
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Bắt buộc';
    }
  });
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
    fullWidth
    {...input}
    {...custom}
  />
);

// eslint-disable-next-line import/no-mutable-exports
let AddLocationForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
  } = props;
  // console.log(groupTable);
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={24} alignContent='center'>
        <Grid item xs={2}/>
        <Grid item xs={8} >
          <Field
            name="locName"
            component={renderTextField}
            label="Tên vị trí"
          />
        </Grid>
        <Grid item xs={2}/>
        <Grid item xs={2}/>
        <Grid item xs={8} >
          <Field
            name="location"
            component={renderTextField}
            label="Địa chỉ"
          />
        </Grid>
        <Grid item xs={2}/>
        <Grid item xs={2}/>
        <Grid item xs={8} >
          <Field
            name="dataSource"
            component={renderTextField}
            label="Nguồn dữ liệu"
          />
        </Grid>
        <Grid item xs={2}/>
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

AddLocationForm = reduxForm({
  form: 'AddLocationForm', // a unique identifier for this form
  validate,
  //asyncValidate,
})(AddLocationForm);

AddLocationForm = connect(state => ({
  initialValues: state.locationDialogData.data, // pull initial values from account reducer
  dialog: state.dialog,
}))(AddLocationForm);

export default AddLocationForm;
