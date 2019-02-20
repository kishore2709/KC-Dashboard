import { PostApiForm, ip } from '_helpers/Utils';
import { aimlConstants } from '../_constants';

function setDataRecentlyTable(message) {
  return { type: aimlConstants.AIML_RECENTLY_DATA, message };
}

function getDataRecentlyTable(topicname) {
  return function(dispatch) {
    PostApiForm(`${ip.server}/aimlquestions/listtop10`, { topicname })
      .then(res => {
        console.log('in get data table', res, topicname);
        if (!res || !Array.isArray(res)) throw new Error('err');
        // must be array
        dispatch(setDataRecentlyTable(res));
      })
      .catch(err => {
        console.log(err);
      });
  };
  // return { type: aimlConstants.AIML_RECENTLY_DATA, message };
}

function saveInfo(message) {
  return { type: aimlConstants.AIML_SERVER_INFO, message };
}

function saveCurrentQuestionAIML(message) {
  return { type: aimlConstants.AIML_CURRENT_QUESTION, message };
}
export const aimlActions = {
  setDataRecentlyTable,
  saveCurrentQuestionAIML,
  saveInfo,
  getDataRecentlyTable,
};
