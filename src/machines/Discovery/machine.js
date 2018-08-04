import { Machine } from 'xstate'

const id = 'discovery'

export const machine = Machine({
  id,
  initial: 'idle',
  strict: true,
  states: {
    idle: {
      on: {
        FETCH_RELEASES: 'fetchingReleases',
        FETCH_MORE_RELEASES: 'fetchingMoreReleases',
        FETCH_ALBUM: 'fetchingAlbum',
        ADD_FAVOURITE: 'addingFavourite',
        REMOVE_FAVOURITE: 'removingFavourite',
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
        FAVOURITE_SUCCESS: 'updatingFeed',
        FAVOURITE_FAILURE: { idle: { actions: ['SHOW_ERROR_MESSAGE'] } },
      },
      onExit: ['HIDE_LOADING'],
    },
    removingFavourite: {
      onEntry: ['REMOVE_FAVOURITE', 'SHOW_LOADING'],
      on: {
        REMOVE_FAVOURITE_SUCCESS: 'updatingFeed',
        REMOVE_FAVOURITE_FAILURE: { idle: { actions: ['SHOW_ERROR_MESSAGE'] } },
      },
      onExit: ['HIDE_LOADING'],
    },
    updatingFeed: {
      onEntry: ['UPDATE_FEED', 'SHOW_LOADING'],
      on: {
        FETCH_SUCCESS: 'idle',
        FETCH_FAILURE: { idle: { actions: ['SHOW_ERROR_MESSAGE'] } },
      },
      onExit: ['HIDE_LOADING'],
    },
  },
})
