import { UPDATE_LOADING, SAVE_TOKEN } from './actions'

export const initialState = {
  state: 'idle',
  loading: false,
  deviceToken: '',
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
    case SAVE_TOKEN:
      return {
        ...state,
        deviceToken: action.payload.token,
      }
    default:
      return state
  }
}
