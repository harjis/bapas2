const initialState = [];
export default function(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ERRORS': {
      return action.errors;
    }
    default:
      return state;
  }
}
