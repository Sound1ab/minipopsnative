import { createSelector } from 'reselect'

const getSearchResults = state => state.discovery.searchResults
const getDiscoveryResults = state => state.discovery.discoveryResults

export const searchResults = createSelector(
  getSearchResults,
  getSearchResults => getSearchResults,
)

export const discoveryResults = createSelector(
  getDiscoveryResults,
  getDiscoveryResults => getDiscoveryResults,
)
