import { SAVE_FEED, REMOVE_FEED_DATA } from './actions'
import { machine } from './machine'

export const initialState = {
  state: machine.initialState.value,
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
    case REMOVE_FEED_DATA:
      return initialState
    default:
      return state
  }
}
