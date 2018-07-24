import { UPDATE_LOADING } from './genericActions'

export const initialState = {
  state: 'idle',
  loading: false,
}

export function app(state = initialState, action) {
  switch (action.type) {
    case '@@app/UPDATE_STATE':
      return {
        ...state,
        state: action.payload,
      }
    case UPDATE_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}
