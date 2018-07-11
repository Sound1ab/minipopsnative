import { SEARCH_MACHINE, updateSearchValue } from './actions'
import { Request } from '../../../services'

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
    const api =
      'https://1z9ortrglh.execute-api.us-east-1.amazonaws.com/dev/current-items'
    const data = await Request.get(api, { keywords: payload })
    console.log('data', data)
    // dispatch('SEARCH_TRANSITION', {type: 'SEARCH_DISPATCHED'});
  },
}
