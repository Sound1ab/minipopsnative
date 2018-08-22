import { SAVE_COGNITO_USER_OBJECT, REMOVE_USER_DATA } from './actions'
import { machine } from './machine'

export const initialState = {
  state: machine.initialState.value,
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
    case REMOVE_USER_DATA:
      return initialState
    default:
      return state
  }
}
