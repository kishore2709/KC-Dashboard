import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// actions
import { actionTypes } from 'redux-form';
// import { formActions } from '_actions';
// import { formConstants } from '_constants';

import { reducer as notifications } from 'react-notification-system-redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { drawer } from './drawer.reducer';
import { dialog } from './dialog.reducer';
import { dateRange } from './dateRange.reducer';
import { serverStatus } from './serverStatus.reducer';
import userDialogData from './AIO/userData.reducer';
import aimlLoader from './AIO/aiml.reducer';
import { userTable } from './userTable.reducer';
import { groupTable } from './groupTable.reducer';
import { aiml } from './aiml.reducer';

//
const FieldNameToNumber = str =>
  parseInt(str.substring(str.indexOf('[') + 1, str.indexOf(']')));

const NumberToFieldName = (num, QA) => `members[${num.toString()}].${QA}`;

const rootReducer = combineReducers({
  notifications,
  dialog,
  aimlLoader,
  aiml,
  dateRange,
  authentication,
  registration,
  users,
  alert,
  drawer,
  serverStatus,
  form: formReducer.plugin({
    QuestionsForm: (state, action) => {
      switch (action.type) {
        case actionTypes.ARRAY_PUSH:
          const len = state.values.members.length - 1;
          const newState = JSON.parse(JSON.stringify(state));
          if (!('disableArray' in newState)) newState.disableArray = {};
          newState.disableArray[`members[${len}].A`] = true;
          return { ...newState };
        case actionTypes.CHANGE:
          const newState2 = JSON.parse(JSON.stringify(state));
          if (action.meta.field[action.meta.field.length - 1] === 'A') {
            newState2.disableArray[action.meta.field] = false;
          }
          return { ...newState2 };
        case actionTypes.FOCUS:
          return {
            ...state,
            activeIndex: FieldNameToNumber(action.meta.field),
          };
        default:
          return state;
      }
    },
  }),
  userDialogData,
  userTable,
  groupTable,
});

export default rootReducer;
