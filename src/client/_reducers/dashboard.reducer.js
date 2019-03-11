import { dashboardConstants } from '../_constants';

export function dashboard(
  state = {
    targetCity: 0,
    data: [],
    loading: false,
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
    case dashboardConstants.FETCH_DATA:
      return {
        ...state,
        loading: true,
      }
    case dashboardConstants.FETCH_DATA_DONE:
      return {
        ...state,
        loading: false,
      }
    default: 
      return state;
  }
}
