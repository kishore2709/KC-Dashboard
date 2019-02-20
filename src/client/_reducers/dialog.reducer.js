import { dialogConstants } from '../_constants';

export function dialog(
  state = {
    type: dialogConstants.DIALOG_USER_CLOSE,
    message: false,
    open: false,
    openPwdForm: false,
    openGroupDialog: false,
    new: false,
    dialogAIML: {
      open: false,
      id: 0,
      message: '',
    },
    dialogAIMLSecond: {
      open: false,
      id: 0,
      message: '',
    },
  },
  action
) {
  switch (action.type) {
    case dialogConstants.DIALOG_AIML_SECOND:
      return {
        ...state,
        dialogAIMLSecond: action.message,
      };
    case dialogConstants.DIALOG_AIML:
      return {
        ...state,
        dialogAIML: action.message,
      };
    case dialogConstants.DIALOG_GROUP_OPEN:
      return {
        ...state,
        type: dialogConstants.DIALOG_GROUP_OPEN,
        openGroupDialog: true,
      };
    case dialogConstants.DIALOG_GROUP_CLOSE:
      return {
        ...state,
        type: dialogConstants.DIALOG_GROUP_CLOSE,
        openGroupDialog: false,
      };
    case dialogConstants.DIALOG_USER_CLOSE:
      return {
        ...state,
        type: dialogConstants.DIALOG_USER_CLOSE,
        open: action.message,
        message: {},
        new: false,
        openPwdForm: state.openPwdForm,
      };
    case dialogConstants.DIALOG_USER_OPEN:
      return {
        ...state,
        type: dialogConstants.DIALOG_USER_OPEN,
        message: {},
        open: action.message,
        openPwdForm: state.openPwdForm,
        new: false,
      };
    case dialogConstants.DIALOG_USER_OPEN_PWD_FORM:
      return {
        ...state,
        type: dialogConstants.DIALOG_USER_OPEN_PWD_FORM,
        message: {},
        openPwdForm: action.message,
        open: state.open,
        new: false,
      };
    case dialogConstants.DIALOG_USER_CLOSE_PWD_FORM:
      return {
        ...state,
        type: dialogConstants.DIALOG_USER_CLOSE_PWD_FORM,
        message: {},
        openPwdForm: action.message,
        open: state.open,
        new: false,
      };
    case dialogConstants.DIALOG_USER_ADD:
      return {
        ...state,
        type: dialogConstants.DIALOG_USER_ADD,
        message: action.message,
        open: state.open,
        openPwdForm: state.openPwdForm,
        new: true,
      };
    case dialogConstants.DIALOG_USER_UPDATE:
      return {
        ...state,
        type: dialogConstants.DIALOG_USER_UPDATE,
        message: action.message,
        open: state.open,
        openPwdForm: state.openPwdForm,
        new: false,
      };
    case dialogConstants.DIALOG_USER_LOAD:
      return {
        ...state,
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
