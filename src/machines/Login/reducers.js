import { SAVE_COGNITO_USER_OBJECT, REMOVE_COGNITO_USER_OBJECT } from './actions'
import { machine } from './machine'

export const initialState = {
  state: machine.initial,
  cognitoUser: {},
  isSignedIn: false,
}

export function login(state = initialState, action) {
  switch (action.type) {
    case `@@${machine.id}/UPDATE_STATE`:
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
