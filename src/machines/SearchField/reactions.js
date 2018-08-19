import {
  updateSearchValue,
  updateSearchResults,
  updateDiscoveryResults,
} from './actions'
import { Request } from '../../services/index'
import { API } from '../../services/index'
import { reactions as appReactions } from '../App'

const { SHOW_LOADING, HIDE_LOADING, SHOW_ERROR_MESSAGE } = appReactions

let timeout

export const reactions = {
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_ERROR_MESSAGE,
  START_TIMER({ payload, dispatchMachineAction }) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatchMachineAction('TIMER_COUNTDOWN_PASSED', payload)
    }, 500)
  },
  CANCEL_TIMER() {
    clearTimeout(timeout)
  },
  UPDATE_SEARCH({ dispatchReduxAction, payload }) {
    dispatchReduxAction(updateSearchValue(payload.value))
  },
  async FETCH_SEARCH({ dispatchReduxAction, payload, dispatchMachineAction }) {
    try {
      const localActions = {
        'current-items': updateSearchResults,
        'related-artists': updateDiscoveryResults,
      }
      const items = await Request.get(API(payload.api), {
        keywords: payload.value,
      })
      dispatchReduxAction(localActions[payload.api](items.data))
      dispatchMachineAction('FETCH_SUCCESS')
    } catch (error) {
      dispatchMachineAction('FETCH_FAILURE', {
        notification: false,
        title: 'Fetch search',
        message: error,
      })
    }
  },
}
