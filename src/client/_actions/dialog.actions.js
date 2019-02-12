import { dialogConstants } from '../_constants';

function openDialog(message) {
  return { type: dialogConstants.DIALOG_USER_OPEN, message };
}

function openDialogPwdForm(message) {
  return { type: dialogConstants.DIALOG_USER_OPEN_PWD_FORM, message };
}

function closeDialogPwdForm(message) {
  return { type: dialogConstants.DIALOG_USER_CLOSE_PWD_FORM, message };
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

function loadDataDialog(message) {
  return { type: dialogConstants.DIALOG_USER_LOAD, message };
}
export const dialogActions = {
  openDialog,
  closeDialog,
  updateDialog,
  addDialog,
  openDialogPwdForm,
  closeDialogPwdForm,
  loadDataDialog,
};
