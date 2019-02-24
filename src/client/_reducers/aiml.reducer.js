import { aimlConstants } from '../_constants';

export function aiml(
  state = { data: [], chatbot: '', topic: '', curAIML: '' },
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
        chatbot: action.message.chatbot,
        topic: action.message.topic,
      };
    default:
      return state;
  }
}
