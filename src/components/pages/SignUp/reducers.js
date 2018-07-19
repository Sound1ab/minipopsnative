export const initialState = {
  state: 'idle',
}

export function signUp(state = initialState, action) {
  switch (action.type) {
    case '@@signUp/UPDATE_STATE':
      return {
        ...state,
        state: action.payload,
      }
    default:
      return state
  }
}
