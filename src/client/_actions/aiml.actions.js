import { aimlConstants } from '../_constants';

function setDataRecentlyTable(message) {
  return { type: aimlConstants.AIML_RECENTLY_DATA, message };
}

export const aimlActions = {
  setDataRecentlyTable,
};
