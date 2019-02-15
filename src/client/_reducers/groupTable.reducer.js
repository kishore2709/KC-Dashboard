import { groupTableConstants } from '../_constants';

export function groupTable(state = [], action) {
  switch (action.type) {
    case groupTableConstants.GROUP_TABLE_ADD:
      return [...state, action.message];
    case groupTableConstants.GROUP_TABLE_SET:
      return action.message;
    default:
      return state;
  }
}
