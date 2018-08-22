// @flow
export const SAVE_ARTIST_RELEASES = 'SAVE_ARTIST_RELEASES'
export const SAVE_ARTIST_ALBUM = 'SAVE_ARTIST_ALBUM'
export const SAVE_FAVOURITES = 'SAVE_FAVOURITES'
export const SAVE_WATCH_LIST = 'SAVE_WATCH_LIST'
export const REMOVE_DISCOVERY_DATA = 'REMOVE_DISCOVERY_DATA'
export const UPDATE_DISCOVERY_SEARCH_VALUE = 'UPDATE_DISCOVERY_SEARCH_VALUE'
export const UPDATE_DISCOVERY_SEARCH_RESULTS = 'UPDATE_DISCOVERY_SEARCH_RESULTS'

export const updateDiscoverySearchValue = (payload: string) => ({
  type: UPDATE_DISCOVERY_SEARCH_VALUE,
  payload,
})

export const updateDiscoverySearchResults = (payload: Array<Object>) => ({
  type: UPDATE_DISCOVERY_SEARCH_RESULTS,
  payload,
})

export const saveArtistReleases = payload => ({
  type: SAVE_ARTIST_RELEASES,
  payload,
})

export const saveArtistAlbum = payload => ({
  type: SAVE_ARTIST_ALBUM,
  payload,
})

export const saveFavourites = payload => ({
  type: SAVE_FAVOURITES,
  payload,
})

export const saveWatchList = payload => ({
  type: SAVE_WATCH_LIST,
  payload,
})

export const removeDiscoveryData = payload => ({
  type: REMOVE_DISCOVERY_DATA,
  payload,
})
