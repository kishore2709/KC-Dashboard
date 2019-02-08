import { userTableConstants } from '../_constants';

export function userTable(state = [], action) {
  switch (action.type) {
    case userTableConstants.USER_TABLE_ADD:
      return [...state, action.message];
    case userTableConstants.USER_TABLE_UPDATE:
      let newState = [...state];
      for (let i = 0; i < newState.length; i++)
        if (newState[i].id === action.message.id) {
          newState[i] = action.message;
          break;
        }
      console.log(newState);
      return newState;
    case userTableConstants.USER_TABLE_SET:
      return action.message;
    case userTableConstants.USER_TABLE_ERROR:
      return state;
    default:
      return state;
  }
}
