import { groupTableConstants } from '../_constants';

export function userTable(state = [], action) {
  switch (action.type) {
    case groupTableConstants.GROUP_TABLE_ADD:
      return [...state, action.message];
    default:
      return state;
  }
}
