import { PostApiForm, ip, PostApi } from '_helpers/Utils';
import { func } from 'prop-types';
import Notifications, { success, error, warning } from 'react-notification-system-redux';
import { aimlConstants } from '../_constants';
import { dialogActions } from './dialog.actions.js';

const notificationOpts = (level, title, message) => ({
  // uid: 'once-please', // you can specify your own uid if required
  level,
  title,
  message,
  position: 'bl',
  autoDismiss: 5,
});

function setDataRecentlyTable(message) {
  return { type: aimlConstants.AIML_RECENTLY_DATA, message };
}

function getDataRecentlyTable(topicname) {
  return function (dispatch) {
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
    PostApiForm(`${ip.server}/chatbots/add`, { chatbotname })
      .then(res => {
        if (res && 'result' in res && res.result) {
          dispatch(getListChatbot());
          dispatch(
            success(
              notificationOpts(
                'success',
                'Thành công',
                'Thêm chatbot: ' + chatbotname + ' thành công'
              )
            )
          );
        } else
          throw new Error(
            'Thêm chatbot: ' + chatbotname + ' không thành công.'
          );
      })
      .catch(err => {
        dispatch(warning(notificationOpts('error', 'Cảnh báo', err.toString())));
      });
  };
}

function addTopic(message) {
  const { topic: topicname, chatbot: chatbotname } = message;
  return dispatch => {
    PostApiForm(`${ip.server}/topics/add`, { topicname, chatbotname })
      .then(res => {
        console.log(res);
        if (res && 'result' in res && res.result) {
          dispatch(getListTopic({ chatbot: chatbotname }));
          dispatch(
            success(
              notificationOpts(
                'success',
                'Thành công',
                'Thêm chatbot: ' +
                chatbotname +
                'topic:' +
                topicname +
                ' thành công'
              )
            )
          );
        } else throw new Error('Thêm topic bị lỗi');
      })
      .catch(err => {
        dispatch(warning(notificationOpts('error', 'Cảnh báo', err.toString())));
      });
  };
}

function deleteChatbot(message) {
  const { chatbot: chatbotname } = message;
  return dispatch => {
    PostApiForm(`${ip.server}/chatbots/deletechatbotbyname`, {
      chatbotname,
    })
      .then(res => {
        if (res && 'result' in res && res.result) {
          dispatch(getListChatbot());
          dispatch(
            success(
              notificationOpts(
                'success',
                'Thành công',
                'Xoá chatbot: ' + chatbotname + ' thành công'
              )
            )
          );
        } else throw new Error('Xoá chatbot không thành công');
      })
      .catch(err => {
        dispatch(warning(notificationOpts('error', 'Cảnh báo', err.toString())));
      });
  };
}

function deleteTopic(message) {
  const { chatbot, topic: topicname } = message;
  return dispatch => {
    PostApiForm(`${ip.server}/topics/deletetopicbyname`, {
      topicname,
    })
      .then(res => {
        // console.log(res);
        if (res && ('result' in res) && res.result) {
          dispatch(getListTopic({ chatbot }));
          dispatch(
            success(
              notificationOpts(
                'success',
                'Thành công',
                'Xoá topic: ' + topicname + ' thành công'
              )
            )
          );
        } else throw new Error('Xoá topic không thành công');
      })
      .catch(err => {
        dispatch(warning(notificationOpts('error', 'Cảnh báo', err.toString())));
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
    const { textquestion, topicname, id } = message;
    PostApiForm(`${ip.server}/aimlquestions/getaimlfromtext`, {
      textquestion,
    }).then(res => {
      console.log(res, topicname, id);
      if (!res || !('aiml_pattern' in res)) throw new Error('err');
      // Save current AIML Question
      dispatch(saveCurrentQuestionAIML(res.aiml_pattern));
      // Show cau hoi tuong tu trong Dialog1
      // console.log(' similar params..', res.aiml_pattern, topicname);
      PostApiForm(`${ip.server}/aimlquestions/getsimilarpatternindb`, {
        aimlpatternfromtext: res.aiml_pattern,
        topicname,
      }).then(res => {
        console.log(' in similar ', res);
        if (!res || !Array.isArray(res)) throw new Error('err');
        console.log('in []', res);
        // console.log(res);
        dispatch(
          dialogActions.dialogAIML({
            open: true,
            message: res,
            id,
          })
        );
      });
    });
  };
}

function sendTextQuestion(message) {
  const {
    textquestion,
    textanswer,
    topicname,
    chatbotname,
    entityname,
  } = message;
  return dispatch => {
    PostApiForm(`${ip.server}/textquestions/addquestions`, {
      textquestion,
      textanswer,
      topicname,
      chatbotname,
      entityname,
    })
      .then(res => {
        if (!res) throw new Error('err');
        if ('error' in res) throw new Error(res.error);
        else {
          // noti ok;
          console.log('save ok', res);
          dispatch(
            success(notificationOpts('Thành công', 'Lưu câu hỏi thành công'))
          );
        }
      })
      .catch(err => {
        dispatch(success(notificationOpts('Cảnh báo', err.toString())));
      });
  };
}

function sendAIMLQuestion(message) {
  const { aimlquestion, aimlanswer, topicname } = message;
  return dispatch => {
    PostApiForm(`${ip.server}/aimlquestions/add`, {
      aimlquestion,
      aimlanswer,
      topicname,
    })
      .then(res => {
        if (!res) throw new Error('err');
        if ('error' in res) throw new Error(res.error);
        else {
          console.log('save aiml ok', res);
          dispatch(
            success(notificationOpts('Thành công', 'Lưu AIML thành công'))
          );
        }
      })
      .catch(err => {
        dispatch(success(notificationOpts('Cảnh báo', err.toString())));
      });
  };
}

export const aimlActions = {
  sendTextQuestion,
  sendAIMLQuestion,
  setDataRecentlyTable,
  saveCurrentQuestionAIML,
  saveInfo,
  saveInfoChatbot,
  getDataRecentlyTable,
  questionToAIML,
  getListChatbot,
  getListTopic,
  addChatbot,
  addTopic,
  deleteChatbot,
  deleteTopic,
};
