import { UPDATE_SEARCH_VALUE, UPDATE_RESULTS } from './actions'

export const initialState = {
  state: 'searching',
  value: '',
  results: [],
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
    case UPDATE_RESULTS:
      return {
        ...state,
        results: action.payload,
      }
    default:
      return state
  }
}
