import { ADD_TO_FAVOURITES } from '../actions/actions'

export const initialState = {
  favourites: [],
}

export function favourites(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_FAVOURITES:
      return {
        ...state,
        favourites: [...state.favourites, action.id],
      }
    default:
      return state
  }
}
