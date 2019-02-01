import { dateRangeConstants } from '../_constants';

function changeDateRange(message) {
  return { type: dateRangeConstants.CHANGE, message };
}

export const dateRangeActions = {
  changeDateRange,
};
