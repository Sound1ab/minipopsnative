import { UPDATE_LOCAL_NOTIFICATIONS } from './actions'
import { machine } from './machine'

export const initialState = {
  state: machine.initial,
  notifications: [],
}

export function localNotifications(state = initialState, action) {
  switch (action.type) {
    case `@@${machine.id}/UPDATE_STATE`:
      return {
        ...state,
        state: action.payload,
      }
    case UPDATE_LOCAL_NOTIFICATIONS:
      console.log('reducer', action.payload)
      return {
        ...state,
        notifications: action.payload.notifications,
      }
    default:
      return state
  }
}
