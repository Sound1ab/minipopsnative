import { SAVE_ARTIST_RELEASES } from './actions'
import { machine } from './machine'

export const initialState = {
  state: machine.initial,
  favourites: [],
  artistReleases: {},
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
    default:
      return state
  }
}
