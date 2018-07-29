import { SAVE_FEED } from './actions'
import { machine } from './machine'

export const initialState = {
  state: machine.initial,
  feed: [],
}

export function feed(state = initialState, action) {
  switch (action.type) {
    case `@@${machine.id}/UPDATE_STATE`:
      return {
        ...state,
        state: action.payload,
      }
    case SAVE_FEED:
      return {
        ...state,
        feed: action.payload.items,
      }
    default:
      return state
  }
}
