import { PostApiForm, ip, PostApi } from '_helpers/Utils';
import { func } from 'prop-types';
import { aimlConstants } from '../_constants';
import { dialogActions } from './dialog.actions.js';

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

function saveInfoChatbot(message) {
  return dispatch => {
    const { idChatbot, chatbot } = message;
    dispatch(saveInfo(message));
    dispatch(getListTopic({ chatbot }));
  };
}
function getListChatbot(message) {
  return dispatch => {
    PostApi(`${ip.server}/chatbots`, {}).then(res => {
      // console.log('in getListChatbot actionsss', res);
      if (Array.isArray(res)) dispatch(saveInfo({ listchatbot: res }));
      else throw new Error(res);
    });
  };
}

function addChatbot(message) {
  const { chatbot: chatbotname } = message;
  return dispatch => {
    PostApiForm(`${ip.server}/chatbots/add`, { chatbotname }).then(res => {
      if (res == 'OK') dispatch(getListChatbot());
      else throw new Error(res);
    });
  };
}

function deleteChatbot(message) {
  const { chatbot: chatbotname } = message;
  return dispatch => {
    PostApiForm(`${ip.server}/chatbots/deletechatbotbyname`, {
      chatbotname,
    }).then(res => {
      if (res == 'OK') dispatch(getListChatbot());
      else throw new Error(res);
    });
  };
}

function getListTopic(message) {
  const { chatbot } = message;
  return dispatch => {
    PostApi(`${ip.server}/topics/getbychatbotname`, {
      chatbotname: chatbot,
    }).then(res => {
      if (Array.isArray(res)) dispatch(saveInfo({ listtopic: res }));
    });
  };
}

function saveCurrentQuestionAIML(message) {
  return { type: aimlConstants.AIML_CURRENT_QUESTION, message };
}

function questionToAIML(message) {
  return dispatch => {
    const { textquestion, topicname } = message;
    PostApiForm(`${ip.server}/aimlquestions/getaimlfromtext`, {
      textquestion,
    })
      .then(res => {
        console.log(res);
        if (!res || !('aiml_pattern' in res)) throw new Error('err');
        // Save current AIML Question
        dispatch(saveCurrentQuestionAIML(res.aiml_pattern));
        // Show cau hoi tuong tu trong Dialog1
        PostApiForm(`${ip.server}/aimlquestions/getsimilarpatternindb`, {
          aimlpatternfromtext: res.aiml_pattern,
          topicname,
        }).then(res => {
          if (!res || !Array.isArray(res)) throw new Error('err');
          // console.log('in []', res);
          // console.log(res);
          dispatch(
            dialogActions.dialogAIML({
              open: true,
              message: res,
              id: index,
            })
          );
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export const aimlActions = {
  setDataRecentlyTable,
  saveCurrentQuestionAIML,
  saveInfo,
  getDataRecentlyTable,
  questionToAIML,
  getListChatbot,
  getListTopic,
  addChatbot,
  deleteChatbot,
};
