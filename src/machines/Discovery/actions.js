// @flow
import { machine } from './machine'
import { actionMap } from './actionMap'
import { RXState } from '../../store/middleware/rxstate'

const rXState = new RXState(machine, actionMap)
export const FAVOURITES_MACHINE_ACTIONS = rXState.getActionCreators()

export const SAVE_ARTIST_RELEASES = 'SAVE_ARTIST_RELEASES'
export const SAVE_ARTIST_ALBUM = 'SAVE_ARTIST_ALBUM'
export const SAVE_FAVOURITES = 'SAVE_FAVOURITES'
export const SAVE_WATCH_LIST = 'SAVE_WATCH_LIST'

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
