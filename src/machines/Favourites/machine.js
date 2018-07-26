import { Machine } from 'xstate'

const id = 'favourites'

export const machine = Machine({
  id,
  initial: 'idle',
  strict: true,
  states: {
    idle: {
      on: {
        FETCH_RELEASES: 'fetchingReleases',
        FETCH_RELEASE: 'fetchingRelease',
        FAVOURITE: 'addingFavourite',
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
    fetchingRelease: {
      onEntry: ['FETCH_RELEASE', 'SHOW_LOADING'],
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
        REMOVE_FAVOURITE_FAILURE: { idle: { actions: ['SHOW_ERROR_MESSAGE'] } },
      },
      onExit: ['HIDE_LOADING'],
    },
  },
})
