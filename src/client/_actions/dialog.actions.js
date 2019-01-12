import { dialogConstants } from '../_constants';

function openDialog(message) {
  return { type: dialogConstants.DIALOG_USER_OPEN, message };
}

function closeDialog(message) {
  return { type: dialogConstants.DIALOG_USER_CLOSE, message };
}
export const dialogActions = {
  openDialog,
  closeDialog,
};
