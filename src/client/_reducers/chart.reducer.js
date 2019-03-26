import { chartConstants } from '../_constants';

export function chart(
  state = {
    chartImageURL: null,
    pieChartImageURL: null,
  },
  action
) {
  switch (action.type) {
    case chartConstants.ADD_CHART_IMAGEURL:
      return {
        ...state,
        chartImageURL: action.message
      }
    case chartConstants.ADD_PIE_CHART_IMAGEURL:
      return {
        ...state,
        pieChartImageURL: action.message
      }
    default: 
      return state;
  }
}
