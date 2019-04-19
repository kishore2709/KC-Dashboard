export function addLocationDialog(state = { open: false }, action) {
  switch (action.type) {
    case 'addLocationDialog':
      return {
        open: action.message.open,
      };
    default:
      return state;
  }
}
