import { dashboardConstants } from '../_constants';

export function dashboard(
  state = {
    targetCity: 0,
    data: {
      dnslogs: [],
      weblogs: [],
    },
    dateRange: {
      start: null,
      end: null,
    },
    loading: false,
    cities: [],
  },
  action
) {
  switch (action.type) {
    case dashboardConstants.SET:
      return {
        ...state,
        data: action.message,
      };
    case dashboardConstants.SET_CITY:
      return {
        ...state,
        cities: action.message,
      };
    case dashboardConstants.CHANGE_CITY:
      return {
        ...state,
        targetCity: action.message,
      };
    case dashboardConstants.CHANGE_DATE_RANGE:
      return {
        ...state,
        dateRange: action.message,
      };
    case dashboardConstants.FETCH_DATA:
      return {
        ...state,
        loading: true,
      };
    case dashboardConstants.FETCH_DATA_DONE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
