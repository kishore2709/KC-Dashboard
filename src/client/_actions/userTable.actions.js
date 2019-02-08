import { userTableConstants } from '../_constants';

function update(message) {
  return { type: userTableConstants.USER_TABLE_UPDATE, message };
}

function add(message) {
  return { type: userTableConstants.USER_TABLE_ADD, message };
}

function set(message) {
  return { type: userTableConstants.USER_TABLE_SET, message };
}

function error(message) {
  return { type: userTableConstants.USER_TABLE_ERROR, message };
}

export const userTableActions = {
  update,
  error,
  add,
  set
};
