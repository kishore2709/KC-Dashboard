import { aimlConstants } from '../_constants';
import { PostApiForm, ip } from '_helpers/Utils';

function setDataRecentlyTable(message) {
  return { type: aimlConstants.AIML_RECENTLY_DATA, message };
}

function getDataRecentlyTable(topicname) {
  return function (dispatch) {
    PostApiForm(ip.server + '/aimlquestions/listtop10', { topicname })
      .then(res => {
        console.log('in get data table', res, topicname);
        if (!res || !Array.isArray(res)) throw new Error('err');
        // must be array
        dispatch(setDataRecentlyTable(res));
      })
      .catch(err => { console.log(err) });
  }
  // return { type: aimlConstants.AIML_RECENTLY_DATA, message };
}

function saveInfo(message) {
  return { type: aimlConstants.AIML_SERVER_INFO, message };
}
export const aimlActions = {
  setDataRecentlyTable,
  saveInfo,
  getDataRecentlyTable,
};
