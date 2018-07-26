import { SAVE_ARTIST_RELEASES, SAVE_ARTIST_RELEASE } from './actions'
import { machine } from './machine'

export const initialState = {
  state: machine.initial,
  favourites: [],
  artistReleases: {},
  artistRelease: {},
}

export function favourites(state = initialState, action) {
  switch (action.type) {
    case `@@${machine.id}/UPDATE_STATE`:
      return {
        ...state,
        state: action.payload,
      }
    case SAVE_ARTIST_RELEASES:
      return {
        ...state,
        artistReleases: {
          ...state.artistReleases,
          [action.payload.spotifyId]: action.payload.items,
        },
      }
    case SAVE_ARTIST_RELEASE:
      return {
        ...state,
        artistRelease: {
          ...state.artistRelease,
          [action.payload.spotifyId]: action.payload.spotifyId
            ? [...action.payload.spotifyId, action.payload.item]
            : [action.payload.item],
        },
      }
    default:
      return state
  }
}
