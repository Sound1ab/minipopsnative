import { Request } from '../../services'
import { API } from '../../services'
import { saveFeed } from './actions'
import { uiActionMap } from '../App/genericActionMap'

export const actionMap = {
  ...uiActionMap,
  async FETCH_FEED({ dispatch, payload, actions }) {
    try {
      const items = await Request.get(API('ebay-items-using-wantlist'), {
        id: payload.id,
      })
      dispatch(saveFeed({ items: items.data }))
      actions.FETCH_SUCCESS()
    } catch (error) {
      actions.FETCH_FAILURE()
    }
  },
}
