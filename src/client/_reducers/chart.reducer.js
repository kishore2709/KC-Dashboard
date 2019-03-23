import { chartConstants } from '../_constants';

export function chart(
  state = {
    chartImageURL: null,
  },
  action
) {
  switch (action.type) {
    case chartConstants.ADD_CHART_IMAGEURL:
      return {
        ...state,
        chartImageURL: action.message
      }
    default: 
      return state;
  }
}
