import { dialogConstants } from '../_constants';

export function dialog(
  state = { type: dialogConstants.DIALOG_USER_CLOSE, message: false, open: false, new: false },
  action
) {
  switch (action.type) {
    case dialogConstants.DIALOG_USER_CLOSE:
      return {
        type: dialogConstants.DIALOG_USER_CLOSE,
        open: action.message,
        message: {},
        new: false,
      };
    case dialogConstants.DIALOG_USER_OPEN:
      return {
        type: dialogConstants.DIALOG_USER_OPEN,
        message: {},
        open: action.message,
        new: false,
      };
    case dialogConstants.DIALOG_USER_ADD:
      return {
        type: dialogConstants.DIALOG_USER_ADD,
        message: action.message,
        open: state.open,
        new: true,
      };
    case dialogConstants.DIALOG_USER_UPDATE:
      return {
        type: dialogConstants.DIALOG_USER_UPDATE,
        message: action.message,
        open: state.open,
        new: false,
      };
    case dialogConstants.DIALOG_USER_LOAD:
      return {
        type: dialogConstants.DIALOG_USER_LOAD,
        message: action.message,
        open: state.open,
        new: false,
      };
    default:
      return state;
  }
}
