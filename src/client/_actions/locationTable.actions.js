import { locationTableConstants } from '../_constants';

function update(message) {
  return { type: locationTableConstants.LOCATION_TABLE_UPDATE, message };
}

function add(message) {
  return { type: locationTableConstants.LOCATION_TABLE_ADD, message };
}

function set(message) {
  return { type: locationTableConstants.LOCATION_TABLE_SET, message };
}

function error(message) {
  return { type: locationTableConstants.LOCATION_TABLE_ERROR, message };
}

function del(message) {
  return { type: locationTableConstants.LOCATION_TABLE_DELETE, message };
}

export const locationTableActions = {
  update,
  error,
  add,
  set,
  del,
};
