import { machine } from './machine'

export const initialState = {
  state: machine.initialState.value,
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
