import { dashboardConstants } from '../_constants';

export function dashboard(
  state = {
    targetCity: 0,
    data: [
      {
        reports: {
          attacks: 0,
          logs: 0,
          pcaps: 0,
          bugs: [],
          website: [],
          server: [],
        },
      },
    ],
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
