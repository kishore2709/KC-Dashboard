import { mailBoxConstans } from '../_constants';

const initialState =  {
    type: mailBoxConstans.INIT_EMAIL,
    dataMail: [],
  };

export function mailBox(state = initialState, action) {
  switch (action.type) {
    case mailBoxConstans.ADD_EMAIL:
      return {
        type: mailBoxConstans.ADD_EMAIL,
        dataMail: action.dataMail,
      };
    case mailBoxConstans.RESET_EMAIL:
      return {
        type: mailBoxConstans.RESET_EMAIL,
        user: action.dataMail,
      };
    default:
      return state;
  }
}
