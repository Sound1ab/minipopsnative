import { UPDATE_LOADING, SAVE_TOKEN, UPDATE_NETINFO_STATUS } from './actions'

export const initialState = {
  state: 'idle',
  loading: false,
  deviceToken: '',
  isOnline: true,
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
    case UPDATE_NETINFO_STATUS:
      return {
        ...state,
        isOnline: action.payload.isOnline,
      }
    default:
      return state
  }
}
