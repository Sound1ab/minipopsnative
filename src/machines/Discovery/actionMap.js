import { Request } from '../../services'
import { API } from '../../services'
import { saveArtistReleases, saveArtistAlbum, saveFavourites } from './actions'
import { uiActionMap } from '../App/genericActionMap'
import { saveFeed } from '../Feed/actions'

export const actionMap = {
  ...uiActionMap,
  FETCH_RELEASES: (() => {
    const request = new Request(API('artist-releases'))
    return async ({ dispatch, payload, actions }) => {
      try {
        const { items, isNewRequest } = await request.paginatedGet({
          id: payload.spotifyId,
        })
        dispatch(saveArtistReleases({ items, isNewRequest }))
        actions.FETCH_SUCCESS()
      } catch (error) {
        actions.FETCH_FAILURE(error)
      }
    }
  })(),
  async FETCH_ALBUM({ dispatch, payload, actions }) {
    try {
      const item = await Request.get(API('artist-release'), {
        id: payload.spotifyId,
      })
      dispatch(saveArtistAlbum({ item: item.data }))
      actions.FETCH_SUCCESS()
    } catch (error) {
      actions.FETCH_FAILURE(error)
    }
  },
  async ADD_FAVOURITE({ dispatch, payload, actions }) {
    try {
      const favourites = await Request.post(API('add-to-want-list'), {
        id: payload.id,
        item: payload.item,
      })
      dispatch(saveFavourites(favourites.data))
      actions.FAVOURITE_SUCCESS({ id: payload.id })
    } catch (error) {
      actions.FAVOURITE_FAILURE(error)
    }
  },
  async REMOVE_FAVOURITE({ dispatch, payload, actions }) {
    try {
      const favourites = await Request.delete(API('remove-from-want-list'), {
        id: payload.id,
        item: payload.item,
      })
      dispatch(saveFavourites(favourites.data))
      actions.REMOVE_FAVOURITE_SUCCESS({ id: payload.id })
    } catch (error) {
      actions.REMOVE_FAVOURITE_FAILURE(error)
    }
  },
  async UPDATE_FEED({ dispatch, payload, actions }) {
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
