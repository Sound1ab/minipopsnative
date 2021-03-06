import {
  UPDATE_LOADING,
  SAVE_TOKEN,
  UPDATE_NETINFO_STATUS,
  SAVE_THEME,
} from './actions'
import { machine } from './machine'

export const initialState = {
  state: machine.initialState.value,
  loading: false,
  deviceToken: '',
  isOnline: true,
  theme: '',
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
    case SAVE_THEME:
      return {
        ...state,
        theme: action.payload.theme,
      }
    default:
      return state
  }
}
