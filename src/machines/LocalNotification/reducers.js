import { SAVE_TOKEN } from './actions'
import { machine } from './machine'

export const initialState = {
  state: machine.initial,
  deviceToken: '',
}

export function localNotifications(state = initialState, action) {
  switch (action.type) {
    case `@@${machine.id}/UPDATE_STATE`:
      return {
        ...state,
        state: action.payload,
      }
    case SAVE_TOKEN:
      return {
        ...state,
        deviceToken: action.payload.token,
      }
    default:
      return state
  }
}
