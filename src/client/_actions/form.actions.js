import { formConstants } from '../_constants';

function check() {
  return { type: formConstants.FORM_QUESTION_CHECK };
}

export const formActions = {
  check,
};
