import { Request } from '../../services'
import { API } from '../../services'
import { saveFeed } from './actions'
import { reactions as appReactions } from '../App'

const { SHOW_LOADING, HIDE_LOADING, SHOW_ERROR_MESSAGE } = appReactions

export const reactions = {
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_ERROR_MESSAGE,
  async FETCH_FEED({ dispatchMachineAction, payload, dispatchReduxAction }) {
    try {
      const items = await Request.get(API('ebay-items-using-wantlist'), {
        id: payload.id,
      })
      dispatchReduxAction(saveFeed({ items: items.data }))
      dispatchMachineAction('FETCH_SUCCESS')
    } catch (error) {
      dispatchMachineAction('FETCH_FAILURE', {
        notification: false,
        title: 'Fetch feed failure',
        message: error,
      })
    }
  },
}
