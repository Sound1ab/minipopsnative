import chunk from 'lodash/chunk'
import { createSelector } from 'reselect'

const getArtistReleases = state => state.discovery.artistReleases
const getFavourites = state => state.discovery.favourites
const getArtistAlbum = state => state.discovery.artistAlbum
const getWatchList = state => state.discovery.watchList
const getSearchValue = state => state.discovery.searchValue
const getSearchResults = state => state.discovery.searchResults

export const artistReleases = createSelector(
  getArtistReleases,
  singularReleases => {
    return chunk(
      singularReleases.reduce((a, b) => {
        if (!a.find(v => v.secondaryTitle === b.secondaryTitle)) {
          a = [...a, b]
        }
        return a
      }, []),
      2,
    )
  },
)

export const favourites = createSelector(
  getFavourites,
  getFavourites => getFavourites,
)

export const artistAlbum = createSelector(
  getArtistAlbum,
  getArtistAlbum => getArtistAlbum,
)

export const watchList = createSelector(getWatchList, getWatchList =>
  getWatchList.map(item => item.spotifyId),
)

export const searchValue = createSelector(
  getSearchValue,
  getSearchValue => getSearchValue,
)

export const searchResults = createSelector(
  getSearchResults,
  getSearchResults => getSearchResults,
)
