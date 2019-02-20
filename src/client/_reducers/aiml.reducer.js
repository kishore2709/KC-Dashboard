import { aimlConstants } from '../_constants';

export function aiml(state = { data: [] }, action) {
  switch (action.type) {
    case aimlConstants.AIML_RECENTLY_DATA:
      return {
        data: action.message,
      };
    default:
      return state;
  }
}
