const LOAD_AIML = 'AIML_LOAD_DATA_AIML_FORM';
const reducer = (state = {
  members: [],
}, action) => {
  // console.log('in aiml reducer');
  // console.log(action);
  switch (action.type) {
    case LOAD_AIML:
      console.log('in reducer');
      // console.log(newState);
      const newState = { ...state };
      const { id, e } = action.data;
      newState.members[id].A = e;

      return newState;
    default:
      return state;
  }
};
export const load = data => {
  console.log(data);
  return { type: LOAD_AIML, data }
};
export default reducer;
