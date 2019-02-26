import { aimlConstants } from '../_constants';
import { aimlActions } from '../_actions/aiml.actions';

export function aiml(
  state = {
    data: [],
    chatbot: '',
    idChatbot: -1,
    idTopic: -1,
    topic: '',
    curAIML: '',
    listchatbot: [],
    listtopic: [],
  },
  action
) {
  switch (action.type) {
    case aimlConstants.AIML_CURRENT_QUESTION:
      return {
        ...state,
        curAIML: action.message,
      };
    case aimlConstants.AIML_RECENTLY_DATA:
      return {
        ...state,
        data: action.message,
      };
    case aimlConstants.AIML_SERVER_INFO:
      return {
        ...state,
        ...action.message,
      };
    default:
      return state;
  }
}
