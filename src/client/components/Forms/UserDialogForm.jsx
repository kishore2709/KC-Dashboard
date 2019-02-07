import React from 'react';
import { Field, reduxForm } from 'redux-form';

const UserDialogForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userid">UserID</label>
        <Field name="userid" component="input" type="text" disable />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <Field name="username" component="input" type="text" disable />
      </div>
      <div>
        <label htmlFor="fullname">Full Name</label>
        <Field name="fullname" component="input" type="text" />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email" />
      </div>
      <div>
        <label htmlFor="phonenumber">Phone number</label>
        <Field name="phonenumber" component="input" type="tel" />
      </div>

      <div>
        <label>Role</label>
        <div>
          <Field name="role" component="select">
            <option value="Admin">Admin</option>
            <option value="Moderator">Moderator</option>
            <option value="User">User</option>
          </Field>
        </div>
      </div>

      <div>
        <label>Status</label>
        <div>
          <Field name="status" component="select">
            <option value>Active</option>
            <option value={false}>Inactive</option>
          </Field>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

UserDialogForm = reduxForm({
  // a unique name for the form
  form: 'userdialogform',
})(UserDialogForm);

export default UserDialogForm;
