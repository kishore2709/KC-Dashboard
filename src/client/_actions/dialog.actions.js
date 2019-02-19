import { dialogConstants } from '../_constants';

function openDialog(message) {
  return { type: dialogConstants.DIALOG_USER_OPEN, message };
}

function dialogAIML(message) {
  return { type: dialogConstants.DIALOG_AIML, message };
}

function dialogAIMLSecond(message) {
  return { type: dialogConstants.DIALOG_AIML_SECOND, message };
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

function openDialogGroup(message) {
  return { type: dialogConstants.DIALOG_GROUP_OPEN, message };
}

function closeDialogGroup(message) {
  return { type: dialogConstants.DIALOG_GROUP_CLOSE, message };
}
export const dialogActions = {
  openDialogGroup,
  dialogAIMLSecond,
  closeDialogGroup,
  openDialog,
  closeDialog,
  updateDialog,
  dialogAIML,
  addDialog,
  openDialogPwdForm,
  closeDialogPwdForm,
  loadDataDialog,
};
