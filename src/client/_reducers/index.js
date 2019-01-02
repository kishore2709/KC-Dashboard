import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { drawer } from './drawer.reducer';
import { dialog } from './dialog.reducer';

const rootReducer = combineReducers({
  dialog,
  authentication,
  registration,
  users,
  alert,
  drawer,
});

export default rootReducer;
