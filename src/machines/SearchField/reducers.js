import {
  UPDATE_SEARCH_VALUE,
  UPDATE_SEARCH_RESULTS,
  UPDATE_DISCOVERY_RESULTS,
} from './actions'

export const initialState = {
  state: 'searching',
  value: '',
  searchResults: [],
  discoveryResults: [],
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
    case UPDATE_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      }
    case UPDATE_DISCOVERY_RESULTS:
      return {
        ...state,
        discoveryResults: action.payload,
      }
    default:
      return state
  }
}
