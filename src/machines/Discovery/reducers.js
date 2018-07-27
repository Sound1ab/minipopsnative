import {
  SAVE_ARTIST_RELEASES,
  SAVE_ARTIST_ALBUM,
  SAVE_FAVOURITES,
} from './actions'
import { machine } from './machine'

export const initialState = {
  state: machine.initial,
  favourites: [],
  artistReleases: {},
  artistAlbum: {
    artist: '',
    name: '',
    tracks: [],
    imageUrl: '',
    spotifyId: '',
  },
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
        artistReleases: action.payload.items,
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
    default:
      return state
  }
}