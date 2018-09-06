import { Request } from '../../services'
import { API } from '../../services'
import { saveProducts, removeProducts } from './actions'
import { reactions as appReactions } from '../App'

const { SHOW_LOADING, HIDE_LOADING, SHOW_ERROR_MESSAGE } = appReactions

export const reactions = {
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_ERROR_MESSAGE,
  async FETCH_PRODUCTS({
    dispatchMachineAction,
    payload,
    dispatchReduxAction,
  }) {
    let items
    const API_BASE = 'scrape'

    try {
      items = await Promise.all([
        Request.get(
          API(`${API_BASE}/discogs-market/${payload.artist}/${payload.album}`),
        ),
        Request.get(API(`${API_BASE}/juno/${payload.artist}/${payload.album}`)),
        Request.get(
          API(`${API_BASE}/vinyltap/${payload.artist}/${payload.album}`),
        ),
        Request.get(API('current-items'), {
          keywords: `${payload.artist} ${payload.album}`,
        }),
      ])
    } catch (error) {
      dispatchMachineAction('FETCH_FAILURE', {
        notification: false,
        title: 'Fetch products failure',
        message: error,
      })
    }

    const [discogs, juno, vinylTap, eBay] = items

    dispatchReduxAction(
      saveProducts({
        discogs: discogs.data,
        juno: juno.data,
        vinylTap: vinylTap.data,
        eBay: eBay.data,
      }),
    )
    dispatchMachineAction('FETCH_SUCCESS')
  },
  REMOVE_PRODUCTS({ dispatchMachineAction, dispatchReduxAction }) {
    dispatchReduxAction(removeProducts())
    dispatchMachineAction('REMOVE_SUCCESS')
  },
}
