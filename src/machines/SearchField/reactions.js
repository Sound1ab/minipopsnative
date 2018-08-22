import { Request } from '../../services/index'
import { API } from '../../services/index'
import { updateSearchValue, updateSearchResults } from './actions'

let timeout

export const reactions = {
  START_TIMER({ payload, dispatchMachineAction }) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatchMachineAction('TIMER_COUNTDOWN_PASSED', payload)
    }, 500)
  },
  CANCEL_TIMER() {
    clearTimeout(timeout)
  },
  async FETCH_SEARCH({ dispatchReduxAction, payload, dispatchMachineAction }) {
    try {
      const items = await Request.get(API(payload.api), {
        keywords: payload.value,
      })
      dispatchMachineAction('FETCH_SUCCESS', { items: items.data })
    } catch (error) {
      dispatchMachineAction('FETCH_FAILURE', {
        notification: false,
        title: 'Fetch search',
        message: error,
      })
    }
  },
  UPDATE_SEARCH({ dispatchReduxAction, payload }) {
    dispatchReduxAction(updateSearchValue(payload.value))
  },
  UPDATE_RESULTS({ dispatchReduxAction, payload, dispatchMachineAction }) {
    dispatchReduxAction(updateSearchResults(payload.items))
    dispatchMachineAction('UPDATE_RESULTS_SUCCESS')
  },
}
