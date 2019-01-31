import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { drawer } from './drawer.reducer';
import { dialog } from './dialog.reducer';
import { dateRange } from './dateRange.reducer';
import { serverStatus } from './serverStatus.reducer';
const rootReducer = combineReducers({
  dialog,
  dateRange,
  authentication,
  registration,
  users,
  alert,
  drawer,
  serverStatus,
});

export default rootReducer;
