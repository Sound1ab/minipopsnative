import { createSelector } from 'reselect'

const getSearchResults = state => state.search.searchResults
const getDiscoveryResults = state => state.search.discoveryResults

export const searchResults = createSelector(
  getSearchResults,
  getSearchResults => getSearchResults,
)

export const discoveryResults = createSelector(
  getDiscoveryResults,
  getDiscoveryResults => getDiscoveryResults,
)
