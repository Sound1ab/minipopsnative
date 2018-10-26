import { Request } from '../../services'
import { READ_EBAY_BY_KEYWORDS } from '../../graphQL'
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
      const variables = {
        keywords: payload.value,
      }

      const items = await Request.query(READ_EBAY_BY_KEYWORDS.query, variables)
      dispatchMachineAction('FETCH_SUCCESS', {
        items: items[READ_EBAY_BY_KEYWORDS.definition],
      })
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
