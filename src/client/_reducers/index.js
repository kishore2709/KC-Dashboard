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
import locationDialogData from './AIO/locationData.reducer';
import { userTable } from './userTable.reducer';
import { groupTable } from './groupTable.reducer';
import { dashboard } from './dashboard.reducer';
import { mailBox } from './mailBox.reducer';
import { chart } from './chart.reducer';
import { addUserDialog } from './addUserDialog.reducer';
import { locationTable } from './locationTable.reducer';
import { addLocationDialog } from './addLocationDialog.reducer';
import { locationDialog } from './locationDialog.reducer';

const rootReducer = combineReducers({
  dashboard,
  locationDialog,
  addUserDialog,
  addLocationDialog,
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
  locationDialogData,
  userTable,
  groupTable,
  mailBox,
  chart,
  locationTable,
});

export default rootReducer;
