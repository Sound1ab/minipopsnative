import {
  SEARCH_MACHINE,
  updateSearchValue,
  updateSearchResults,
  updateDiscoveryResults,
} from './actions'
import { Request } from '../../../services/index'
import { API } from '../../../services/index'

let timeout

export const actionMap = {
  START_TIMER({ dispatch, payload }) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch(SEARCH_MACHINE.TIMER_COUNTDOWN_PASSED(payload))
    }, 500)
  },
  CANCEL_TIMER() {
    clearTimeout(timeout)
  },
  UPDATE_SEARCH({ dispatch, payload }) {
    dispatch(updateSearchValue(payload.value))
  },
  async DISPATCHING_SEARCH({ dispatch, payload }) {
    try {
      const actions = {
        'current-items': updateSearchResults,
        'related-artists': updateDiscoveryResults,
      }
      const items = await Request.get(API(payload.api), {
        keywords: payload.value,
      })
      dispatch(actions[payload.api](items.data))
    } catch (error) {
      throw new Error(error)
    }
    dispatch(SEARCH_MACHINE.SEARCH_DISPATCHED())
  },
}