import { groupTableConstants } from '../_constants';

function add(message) {
  return { type: groupTableConstants.GROUP_TABLE_ADD, message };
}

export const groupTableActions = {
  add,
};
