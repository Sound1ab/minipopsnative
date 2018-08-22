import {
  UPDATE_SEARCH_VALUE,
  UPDATE_SEARCH_RESULTS,
  REMOVE_SEARCH_RESULTS,
} from './actions'

export const initialState = {
  state: 'searching',
  searchValue: '',
  searchResults: [],
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
        searchValue: action.payload,
      }
    case UPDATE_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      }
    case REMOVE_SEARCH_RESULTS:
      return initialState
    default:
      return state
  }
}
