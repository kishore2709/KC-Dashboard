import { dateRangeConstants } from '../_constants';

export function dateRange(state = {type: dateRangeConstants.CHANGE,
  message: {
    startDate:'',
    endDate:'',
  }}, action) {
  switch (action.type) {
    case dateRangeConstants.CHANGE:
      return {
        type: dateRangeConstants.CHANGE,
        message: action.message,
      };
    default:
      return state;
  }
}
