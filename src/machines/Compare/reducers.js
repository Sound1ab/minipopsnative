import { SAVE_PRODUCTS, REMOVE_PRODUCTS } from './actions'
import { machine } from './machine'

export const initialState = {
  state: machine.initialState.value,
  products: {
    discogs: [],
    juno: [],
    vinylTap: [],
    eBay: [],
  },
}

export function compare(state = initialState, action) {
  switch (action.type) {
    case `@@${machine.id}/UPDATE_STATE`:
      return {
        ...state,
        state: action.payload,
      }
    case SAVE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }
    case REMOVE_PRODUCTS:
      return initialState
    default:
      return state
  }
}
