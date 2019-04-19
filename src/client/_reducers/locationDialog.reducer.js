import { locationDialogConstants } from '../_constants';

export function locationDialog(
  state = {
    type: locationDialogConstants.LOCATION_DIALOG_USER_CLOSE,
    message: false,
    open: false,
    openPwdForm: false,
    openGroupDialog: false,
    new: false,
  },
  action
) {
  switch (action.type) {
    case locationDialogConstants.LOCATION_DIALOG_GROUP_OPEN:
      return {
        ...state,
        type: locationDialogConstants.LOCATION_DIALOG_GROUP_OPEN,
        openGroupDialog: true,
      };
    case locationDialogConstants.LOCATION_DIALOG_GROUP_CLOSE:
      return {
        ...state,
        type: locationDialogConstants.LOCATION_DIALOG_GROUP_CLOSE,
        openGroupDialog: false,
      };
    case locationDialogConstants.LOCATION_DIALOG_USER_CLOSE:
      return {
        ...state,
        type: locationDialogConstants.LOCATION_DIALOG_USER_CLOSE,
        open: action.message,
        message: {},
        new: false,
        openPwdForm: state.openPwdForm,
      };
    case locationDialogConstants.LOCATION_DIALOG_USER_OPEN:
      return {
        ...state,
        type: locationDialogConstants.LOCATION_DIALOG_USER_OPEN,
        message: {},
        open: action.message,
        openPwdForm: state.openPwdForm,
        new: false,
      };
    case locationDialogConstants.LOCATION_DIALOG_USER_OPEN_PWD_FORM:
      return {
        ...state,
        type: locationDialogConstants.LOCATION_DIALOG_USER_OPEN_PWD_FORM,
        message: {},
        openPwdForm: action.message,
        open: state.open,
        new: false,
      };
    case locationDialogConstants.LOCATION_DIALOG_USER_CLOSE_PWD_FORM:
      return {
        ...state,
        type: locationDialogConstants.LOCATION_DIALOG_USER_CLOSE_PWD_FORM,
        message: {},
        openPwdForm: action.message,
        open: state.open,
        new: false,
      };
    case locationDialogConstants.LOCATION_DIALOG_USER_ADD:
      return {
        ...state,
        type: locationDialogConstants.LOCATION_DIALOG_USER_ADD,
        message: action.message,
        open: state.open,
        openPwdForm: state.openPwdForm,
        new: true,
      };
    case locationDialogConstants.LOCATION_DIALOG_USER_UPDATE:
      return {
        ...state,
        type: locationDialogConstants.LOCATION_DIALOG_USER_UPDATE,
        message: action.message,
        open: state.open,
        openPwdForm: state.openPwdForm,
        new: false,
      };
    case locationDialogConstants.LOCATION_DIALOG_USER_LOAD:
      return {
        ...state,
        type: locationDialogConstants.LOCATION_DIALOG_USER_LOAD,
        message: action.message,
        open: state.open,
        openPwdForm: state.openPwdForm,
        new: false,
      };
    default:
      return state;
  }
}
