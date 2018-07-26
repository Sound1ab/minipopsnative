import { Request } from '../../services'
import { API } from '../../services'
import { saveArtistReleases } from './actions'
import { uiActionMap } from '../App/genericActionMap'

export const actionMap = {
  ...uiActionMap,
  async FETCH_RELEASES({ dispatch, payload, actions }) {
    try {
      const items = await Request.get(API('artist-releases'), {
        id: payload,
      })
      dispatch(saveArtistReleases({ spotifyId: payload, items: items.data }))
      actions.FETCH_SUCCESS()
    } catch (error) {
      actions.FETCH_FAILURE()
    }
  },
}
