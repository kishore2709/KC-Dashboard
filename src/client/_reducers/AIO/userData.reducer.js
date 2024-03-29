const LOAD = 'USER_LOAD_DATA_USER_FORM';
const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return {
        data: action.data,
      };
    default:
      return state;
  }
};
export const load = data => ({ type: LOAD, data });
export default reducer;
