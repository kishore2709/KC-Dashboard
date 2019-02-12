import { dialogConstants } from '../_constants';

export function dialog(
  state = {
    type: dialogConstants.DIALOG_USER_CLOSE,
    message: false,
    open: false,
    openPwdForm: false,
    new: false,
  },
  action
) {
  switch (action.type) {
    case dialogConstants.DIALOG_USER_CLOSE:
      return {
        type: dialogConstants.DIALOG_USER_CLOSE,
        open: action.message,
        message: {},
        new: false,
        openPwdForm: state.openPwdForm,
      };
    case dialogConstants.DIALOG_USER_OPEN:
      return {
        type: dialogConstants.DIALOG_USER_OPEN,
        message: {},
        open: action.message,
        openPwdForm: state.openPwdForm,
        new: false,
      };
    case dialogConstants.DIALOG_USER_OPEN_PWD_FORM:
      return {
        type: dialogConstants.DIALOG_USER_OPEN_PWD_FORM,
        message: {},
        openPwdForm: action.message,
        open: state.open,
        new: false,
      };
    case dialogConstants.DIALOG_USER_CLOSE_PWD_FORM:
      return {
        type: dialogConstants.DIALOG_USER_CLOSE_PWD_FORM,
        message: {},
        openPwdForm: action.message,
        open: state.open,
        new: false,
      };
    case dialogConstants.DIALOG_USER_ADD:
      return {
        type: dialogConstants.DIALOG_USER_ADD,
        message: action.message,
        open: state.open,
        openPwdForm: state.openPwdForm,
        new: true,
      };
    case dialogConstants.DIALOG_USER_UPDATE:
      return {
        type: dialogConstants.DIALOG_USER_UPDATE,
        message: action.message,
        open: state.open,
        openPwdForm: state.openPwdForm,
        new: false,
      };
    case dialogConstants.DIALOG_USER_LOAD:
      return {
        type: dialogConstants.DIALOG_USER_LOAD,
        message: action.message,
        open: state.open,
        openPwdForm: state.openPwdForm,
        new: false,
      };
    default:
      return state;
  }
}
