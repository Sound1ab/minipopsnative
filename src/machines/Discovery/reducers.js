import {
  SAVE_ARTIST_RELEASES,
  SAVE_ARTIST_ALBUM,
  SAVE_FAVOURITES,
  SAVE_WATCH_LIST,
  REMOVE_DISCOVERY_DATA,
} from './actions'
import { machine } from './machine'

export const initialState = {
  state: machine.initial,
  favourites: [],
  artistReleases: [],
  artistAlbum: {
    artist: '',
    name: '',
    tracks: [],
    imageUrl: '',
    spotifyId: '',
  },
  watchList: [],
}

export function discovery(state = initialState, action) {
  switch (action.type) {
    case `@@${machine.id}/UPDATE_STATE`:
      return {
        ...state,
        state: action.payload,
      }
    case SAVE_ARTIST_RELEASES:
      return {
        ...state,
        artistReleases: action.payload.isNewRequest
          ? action.payload.items
          : [...state.artistReleases, ...action.payload.items],
      }
    case SAVE_ARTIST_ALBUM:
      return {
        ...state,
        artistAlbum: action.payload.item,
      }
    case SAVE_FAVOURITES:
      return {
        ...state,
        favourites: action.payload,
      }
    case SAVE_WATCH_LIST:
      return {
        ...state,
        watchList: action.payload.items,
      }
    case REMOVE_DISCOVERY_DATA:
      return initialState
    default:
      return state
  }
}
