import { chartConstants } from '../_constants';

function addChartImageURL(message) {
  return { type: chartConstants.ADD_CHART_IMAGEURL, message };
}

export const chartActions = {
    addChartImageURL,
};
