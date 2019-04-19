import { locationDialogConstants } from '../_constants';

function openDialog(message) {
  return { type: locationDialogConstants.LOCATION_DIALOG_USER_OPEN, message };
}

function openDialogPwdForm(message) {
  return { type: locationDialogConstants.LOCATION_DIALOG_USER_OPEN_PWD_FORM, message };
}

function closeDialogPwdForm(message) {
  return { type: locationDialogConstants.LOCATION_DIALOG_USER_CLOSE_PWD_FORM, message };
}
function closeDialog(message) {
  return { type: locationDialogConstants.LOCATION_DIALOG_USER_CLOSE, message };
}

function updateDialog(message) {
  return { type: locationDialogConstants.LOCATION_DIALOG_USER_UPDATE, message };
}

function addDialog(message) {
  return { type: locationDialogConstants.LOCATION_DIALOG_USER_ADD, message };
}

function loadDataDialog(message) {
  return { type: locationDialogConstants.LOCATION_DIALOG_USER_LOAD, message };
}

function openDialogGroup(message) {
  return { type: locationDialogConstants.LOCATION_DIALOG_GROUP_OPEN, message };
}

function closeDialogGroup(message) {
  return { type: locationDialogConstants.LOCATION_DIALOG_GROUP_CLOSE, message };
}
export const locationDialogActions = {
  openDialogGroup,
  closeDialogGroup,
  openDialog,
  closeDialog,
  updateDialog,
  addDialog,
  openDialogPwdForm,
  closeDialogPwdForm,
  loadDataDialog,
};
