import { SAVE_COGNITO_USER_OBJECT, REMOVE_COGNITO_USER_OBJECT } from './actions'
import { signInMachine } from './machine'

export const initialState = {
  state: signInMachine.initial,
  cognitoUser: {},
  isSignedIn: false,
}

export function signIn(state = initialState, action) {
  switch (action.type) {
    case '@@signIn/UPDATE_STATE':
      return {
        ...state,
        state: action.payload,
      }
    case SAVE_COGNITO_USER_OBJECT:
      return {
        ...state,
        cognitoUser: action.payload,
        isSignedIn: true,
      }
    case REMOVE_COGNITO_USER_OBJECT:
      return {
        ...state,
        cognitoUser: {},
        isSignedIn: false,
      }
    default:
      return state
  }
}
