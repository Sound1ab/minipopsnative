import {
  updateSearchValue,
  updateSearchResults,
  updateDiscoveryResults,
} from './actions'
import { Request } from '../../services/index'
import { API } from '../../services/index'
import { uiActionMap } from '../App/genericActionMap'

let timeout

export const actionMap = {
  ...uiActionMap,
  START_TIMER({ payload, actions }) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      actions.TIMER_COUNTDOWN_PASSED(payload)
    }, 500)
  },
  CANCEL_TIMER() {
    clearTimeout(timeout)
  },
  UPDATE_SEARCH({ dispatch, payload }) {
    dispatch(updateSearchValue(payload.value))
  },
  async DISPATCHING_SEARCH({ dispatch, payload, actions }) {
    try {
      const actions = {
        'current-items': updateSearchResults,
        'related-artists': updateDiscoveryResults,
      }
      const items = await Request.get(API(payload.api), {
        keywords: payload.value,
      })
      dispatch(actions[payload.api](items.data))
      actions.SEARCH_SUCCESS()
    } catch (error) {
      actions.SEARCH_FAILURE()
    }
  },
}
