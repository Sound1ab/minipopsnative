import { Request } from '../../services'
import { inAppNotification } from '../../navigation'
import { API } from '../../services'
import {
  saveArtistReleases,
  saveArtistAlbum,
  saveFavourites,
  saveWatchList,
} from './actions'
import { uiActionMap } from '../App/genericActionMap'
import { saveFeed } from '../Feed/actions'

export const actionMap = {
  ...uiActionMap,
  FETCH_RELEASES: (() => {
    const request = new Request(API('artist-releases'), 30)
    return async ({ dispatch, payload, actions }) => {
      try {
        const { items, isNewRequest, isDone } = await request.paginatedGet({
          id: payload.spotifyId,
        })
        !isDone ? dispatch(saveArtistReleases({ items, isNewRequest })) : null
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
      inAppNotification({ title: 'Favourite added!', timeout: 500 })
      actions.FAVOURITE_SUCCESS({ id: payload.id })
    } catch (error) {
      inAppNotification({
        title: 'Could not add favourite',
        timeout: 500,
      })
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
      inAppNotification({ title: 'Favourite removed!', timeout: 500 })
      actions.REMOVE_FAVOURITE_SUCCESS({ id: payload.id })
    } catch (error) {
      inAppNotification({
        title: 'Could not remove favourite',
        timeout: 500,
      })
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
  async ADD_TO_WATCH_LIST({ dispatch, payload, actions }) {
    try {
      const items = await Request.post(API('add-to-watch-list'), {
        id: payload.id,
        item: payload.item,
      })
      dispatch(saveWatchList({ items: items.data }))
      inAppNotification({
        title: 'Your favourite is being watched!',
        message: "If an item is selling on eBay, we'll let you know.",
        timeout: 500,
      })
      actions.ADD_SUCCESS()
    } catch (error) {
      inAppNotification({
        title: 'Could not add favourite',
        timeout: 500,
      })
      actions.ADD_FAILURE()
    }
  },
  async REMOVE_FROM_WATCH_LIST({ dispatch, payload, actions }) {
    try {
      const items = await Request.delete(API('remove-from-watch-list'), {
        id: payload.id,
        item: payload.item,
      })
      dispatch(saveWatchList({ items: items.data }))
      inAppNotification({
        title: 'Your favourite is no longer being watched!',
        timeout: 500,
      })
      actions.REMOVE_FROM_WATCH_LIST_SUCCESS(payload)
    } catch (error) {
      inAppNotification({
        title: 'Something went wrong',
        timeout: 500,
      })
      actions.REMOVE_FROM_WATCH_LIST_FAILURE(error)
    }
  },
}
