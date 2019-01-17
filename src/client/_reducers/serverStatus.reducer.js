import { serverStatusConstants } from '../_constants';

export function serverStatus(
  state = {
    type: serverStatusConstants.LOADING,
    message: 'loading',
  },
  action
) {
  switch (action.type) {
    case serverStatusConstants.SUCCESS:
      return {
        type: serverStatusConstants.SUCCESS,
        message: action.message,
      };
    case serverStatusConstants.ERROR:
      return {
        type: serverStatusConstants.ERROR,
        message: action.message,
      };
    case serverStatusConstants.LOADING:
      return {
        type: serverStatusConstants.ERROR,
        message: action.message,
      };
    default:
      return state;
  }
}
