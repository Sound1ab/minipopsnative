import { Machine } from 'xstate'
import { internalMachine as searchInternalMachine } from '../SearchField'

const id = 'discovery'

export const machine = Machine({
  id,
  parallel: true,
  strict: true,
  states: {
    // TODO: Split these states out into seperate parallel machines
    discovery: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            FETCH_RELEASES: 'fetchingReleases',
            FETCH_MORE_RELEASES: 'fetchingMoreReleases',
            FETCH_ALBUM: 'fetchingAlbum',
            ADD_FAVOURITE: 'addingFavourite',
            REMOVE_FAVOURITE: 'removingFavourite',
            ADD_TO_WATCH_LIST: 'addingToWatchList',
            REMOVE_FROM_WATCH_LIST: 'removingFromWatchList',
          },
        },
        fetchingReleases: {
          onEntry: ['FETCH_RELEASES', 'SHOW_LOADING'],
          on: {
            FETCH_SUCCESS: 'idle',
            FETCH_FAILURE: { idle: { actions: ['SHOW_ERROR_MESSAGE'] } },
          },
          onExit: ['HIDE_LOADING'],
        },
        fetchingMoreReleases: {
          onEntry: ['FETCH_RELEASES', 'SHOW_LOADING'],
          on: {
            FETCH_SUCCESS: 'idle',
            FETCH_FAILURE: { idle: { actions: ['SHOW_ERROR_MESSAGE'] } },
          },
          onExit: ['HIDE_LOADING'],
        },
        fetchingAlbum: {
          onEntry: ['FETCH_ALBUM', 'SHOW_LOADING'],
          on: {
            FETCH_SUCCESS: 'idle',
            FETCH_FAILURE: { idle: { actions: ['SHOW_ERROR_MESSAGE'] } },
          },
          onExit: ['HIDE_LOADING'],
        },
        addingFavourite: {
          onEntry: ['ADD_FAVOURITE', 'SHOW_LOADING'],
          on: {
            FAVOURITE_SUCCESS: 'idle',
            FAVOURITE_FAILURE: { idle: { actions: ['SHOW_ERROR_MESSAGE'] } },
          },
          onExit: ['HIDE_LOADING'],
        },
        removingFavourite: {
          onEntry: ['REMOVE_FAVOURITE', 'SHOW_LOADING'],
          on: {
            REMOVE_FAVOURITE_SUCCESS: 'idle',
            REMOVE_FAVOURITE_FAILURE: {
              idle: { actions: ['SHOW_ERROR_MESSAGE'] },
            },
          },
          onExit: ['HIDE_LOADING'],
        },
        addingToWatchList: {
          onEntry: ['ADD_TO_WATCH_LIST', 'SHOW_LOADING'],
          on: {
            ADD_SUCCESS: 'idle',
            ADD_FAILURE: { idle: { actions: ['SHOW_ERROR_MESSAGE'] } },
          },
          onExit: ['HIDE_LOADING'],
        },
        removingFromWatchList: {
          onEntry: ['REMOVE_FROM_WATCH_LIST', 'SHOW_LOADING'],
          on: {
            REMOVE_FROM_WATCH_LIST_SUCCESS: 'idle',
            REMOVE_FROM_WATCH_LIST_FAILURE: {
              idle: { actions: ['SHOW_ERROR_MESSAGE'] },
            },
          },
          onExit: ['HIDE_LOADING'],
        },
      },
    },
    search: {
      ...searchInternalMachine,
    },
  },
})
