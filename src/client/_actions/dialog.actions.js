import { dialogConstants } from '../_constants';

function openDialog(message) {
  return { type: dialogConstants.DIALOG_USER_OPEN, message };
}

function closeDialog(message) {
  return { type: dialogConstants.DIALOG_USER_CLOSE, message };
}

function updateDialog(message) {
  return { type: dialogConstants.DIALOG_USER_UPDATE, message };
}

function addDialog(message) {
  return { type: dialogConstants.DIALOG_USER_ADD, message };
}
export const dialogActions = {
  openDialog,
  closeDialog,
  updateDialog,
  addDialog,
};
