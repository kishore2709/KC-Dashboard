import { serverStatusConstants } from '../_constants';

function success(message) {
  return { type: serverStatusConstants.SUCCESS, message };
}

function error(message) {
  return { type: serverStatusConstants.ERROR, message };
}

function loading() {
  return { type: serverStatusConstants.LOADING };
}
export const serverStatusActions = {
  success,
  error,
  loading,
};
