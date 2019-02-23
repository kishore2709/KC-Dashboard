import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { drawer } from './drawer.reducer';
import { dialog } from './dialog.reducer';
import { dateRange } from './dateRange.reducer';
import { serverStatus } from './serverStatus.reducer';
import userDialogData from './AIO/userData.reducer';
import { userTable } from './userTable.reducer';
import { groupTable } from './groupTable.reducer';
import { mailBox } from './mailBox.reducer';

const rootReducer = combineReducers({
  dialog,
  dateRange,
  authentication,
  registration,
  users,
  alert,
  drawer,
  serverStatus,
  form: formReducer,
  userDialogData,
  userTable,
  groupTable,
  mailBox,
});

export default rootReducer;
