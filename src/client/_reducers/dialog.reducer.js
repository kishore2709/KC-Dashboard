import { dialogConstants } from '../_constants';

export function dialog(
  state = { type: dialogConstants.DIALOG_USER_CLOSE, message: false },
  action
) {
  switch (action.type) {
    case dialogConstants.DIALOG_USER_CLOSE:
      return {
        type: dialogConstants.DIALOG_USER_CLOSE,
        message: action.message,
      };
    case dialogConstants.DIALOG_USER_OPEN:
      return {
        type: dialogConstants.DIALOG_USER_OPEN,
        message: action.message,
      };
    default:
      return state;
  }
}
