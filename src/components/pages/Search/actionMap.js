import { SEARCH_MACHINE, updateSearchValue, updateResults } from './actions'
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
  UPDATE_SEARCH({ dispatch, payload }) {
    dispatch(updateSearchValue(payload))
  },
  async DISPATCHING_SEARCH({ dispatch, payload }) {
    try {
      const items = await Request.get(API('current-items'), {
        keywords: payload,
      })
      dispatch(updateResults(items.data))
    } catch (error) {
      throw new Error(error)
    }
    dispatch(SEARCH_MACHINE.SEARCH_DISPATCHED())
  },
}
