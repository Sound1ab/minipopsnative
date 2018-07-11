import { UPDATE_SEARCH_VALUE } from './actions'

export const initialState = {
  state: 'searching',
  value: '',
}

export function search(state = initialState, action) {
  switch (action.type) {
    case '@@search/UPDATE_STATE':
      return {
        ...state,
        state: action.payload,
      }
    case UPDATE_SEARCH_VALUE:
      return {
        ...state,
        value: action.payload,
      }
    default:
      return state
  }
}
