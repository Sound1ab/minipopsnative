// @flow
export const UPDATE_SEARCH_VALUE = 'UPDATE_SEARCH_VALUE'
export const UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS'
export const REMOVE_SEARCH_RESULTS = 'REMOVE_SEARCH_RESULTS'

export const updateSearchValue = (payload: Array<Object>) => ({
  type: UPDATE_SEARCH_VALUE,
  payload,
})

export const updateSearchResults = (payload: Array<Object>) => ({
  type: UPDATE_SEARCH_RESULTS,
  payload,
})

export const removeSearchResults = (payload: Array<Object>) => ({
  type: REMOVE_SEARCH_RESULTS,
  payload,
})
