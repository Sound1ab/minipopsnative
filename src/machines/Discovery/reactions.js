import { Request } from '../../services'
import { inAppNotification } from '../../navigation'
import { API } from '../../services'
import {
  saveArtistReleases,
  saveArtistAlbum,
  saveFavourites,
  saveWatchList,
  updateDiscoverySearchValue,
  updateDiscoverySearchResults,
} from './actions'
import { reactions as appReactions } from '../App'
import { reactions as searchReactions } from '../SearchField'

const { SHOW_LOADING, HIDE_LOADING, SHOW_ERROR_MESSAGE } = appReactions
const { START_TIMER, CANCEL_TIMER, FETCH_SEARCH } = searchReactions

export const reactions = {
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_ERROR_MESSAGE,
  START_TIMER,
  CANCEL_TIMER,
  FETCH_SEARCH,
  UPDATE_SEARCH({ dispatchReduxAction, payload }) {
    dispatchReduxAction(updateDiscoverySearchValue(payload.value))
  },
  UPDATE_RESULTS({ dispatchReduxAction, payload, dispatchMachineAction }) {
    dispatchReduxAction(updateDiscoverySearchResults(payload.items))
    dispatchMachineAction('UPDATE_RESULTS_SUCCESS')
  },
  FETCH_RELEASES: (() => {
    const request = new Request(API('artist-releases'), 30)
    return async ({ dispatchReduxAction, payload, dispatchMachineAction }) => {
      try {
        const { items, isNewRequest, isDone } = await request.paginatedGet({
          id: payload.spotifyId,
        })
        !isDone
          ? dispatchReduxAction(saveArtistReleases({ items, isNewRequest }))
          : null
        dispatchMachineAction('FETCH_SUCCESS')
      } catch (error) {
        dispatchMachineAction('FETCH_FAILURE', {
          notification: true,
          message: "Oh no, I can't get any albums right now",
        })
      }
    }
  })(),
  async FETCH_ALBUM({ dispatchReduxAction, payload, dispatchMachineAction }) {
    try {
      const item = await Request.get(API('artist-release'), {
        id: payload.spotifyId,
      })
      dispatchReduxAction(saveArtistAlbum({ item: item.data }))
      dispatchMachineAction('FETCH_SUCCESS')
    } catch (error) {
      dispatchMachineAction('FETCH_FAILURE', {
        notification: true,
        message: "Oh no, I can't get the album right now",
      })
    }
  },
  async ADD_FAVOURITE({ dispatchReduxAction, payload, dispatchMachineAction }) {
    try {
      const favourites = await Request.post(API('add-to-want-list'), {
        id: payload.id,
        item: payload.item,
      })
      dispatchReduxAction(saveFavourites(favourites.data))
      dispatchMachineAction('FAVOURITE_SUCCESS', { id: payload.id })
    } catch (error) {
      dispatchMachineAction('FAVOURITE_FAILURE', {
        notification: true,
        message: "Oh no, I can't favourite that album right now",
      })
    }
  },
  async REMOVE_FAVOURITE({
    dispatchReduxAction,
    payload,
    dispatchMachineAction,
  }) {
    try {
      const favourites = await Request.delete(API('remove-from-want-list'), {
        id: payload.id,
        item: payload.item,
      })
      dispatchReduxAction(saveFavourites(favourites.data))
      dispatchMachineAction('REMOVE_FAVOURITE_SUCCESS', { id: payload.id })
    } catch (error) {
      dispatchMachineAction('REMOVE_FAVOURITE_FAILURE', {
        notification: true,
        message:
          "Oh no, we couldn't remove this album from your favourites, please try again",
      })
    }
  },
  async ADD_TO_WATCH_LIST({
    dispatchReduxAction,
    payload,
    dispatchMachineAction,
  }) {
    try {
      const items = await Request.post(API('add-to-watch-list'), {
        id: payload.id,
        item: payload.item,
      })
      dispatchReduxAction(saveWatchList({ items: items.data }))
      inAppNotification({
        title: '💁',
        message:
          "Your favourite is being watched! If an item is selling on eBay, we'll let you know. 👌",
        timeout: 500,
      })
      dispatchMachineAction('ADD_SUCCESS')
    } catch (error) {
      dispatchMachineAction('ADD_FAILURE', {
        notification: true,
        message: "Oh no, we couldn't watch that album, please try again",
      })
    }
  },
  async REMOVE_FROM_WATCH_LIST({
    dispatchReduxAction,
    payload,
    dispatchMachineAction,
  }) {
    try {
      const items = await Request.delete(API('remove-from-watch-list'), {
        id: payload.id,
        item: payload.item,
      })
      dispatchReduxAction(saveWatchList({ items: items.data }))
      inAppNotification({
        title: '💁',
        message: 'Your favourite is no longer being watched!',
        timeout: 500,
      })
      dispatchMachineAction('REMOVE_FROM_WATCH_LIST_SUCCESS', payload)
    } catch (error) {
      dispatchMachineAction('REMOVE_FROM_WATCH_LIST_FAILURE', {
        notification: true,
        message:
          "Oh no, we couldn't stop watching that album, please try again",
      })
    }
  },
}
