import { dashboardConstants } from '../_constants';

export function dashboard(
  state = {
    targetCity: 0,
    data: [],
  },
  action
) {
  switch (action.type) {
    case dashboardConstants.SET:
      return {
        ...state,
        data: action.message,
      };
    case dashboardConstants.CHANGE_CITY:
      return {
        ...state,
        targetCity: action.message,
      };
    default:
      return state;
  }
}
