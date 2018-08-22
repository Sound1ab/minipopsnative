import { createSelector } from 'reselect'

const getSearchValue = state => state.search.searchValue
const getSearchResults = state => state.search.searchResults

export const searchValue = createSelector(
  getSearchValue,
  getSearchValue => getSearchValue,
)

export const searchResults = createSelector(
  getSearchResults,
  getSearchResults => getSearchResults,
)
