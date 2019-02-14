import { groupTableConstants } from '../_constants';

function add(message) {
  return { type: groupTableConstants.GROUP_TABLE_ADD, message };
}

function set(message) {
  return { type: groupTableConstants.GROUP_TABLE_SET, message };
}
export const groupTableActions = {
  add,
  set,
};
