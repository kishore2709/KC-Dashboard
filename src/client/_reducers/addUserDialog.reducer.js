export function addUserDialog(state = { open: false }, action) {
  switch (action.type) {
    case 'addUserDialog':
      return {
        open: action.message.open,
      };
    default:
      return state;
  }
}
