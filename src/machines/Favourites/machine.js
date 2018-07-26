import { Machine } from 'xstate'

const id = 'favourites'

export const machine = Machine({
  id,
  initial: 'idle.waitingForFetch',
  strict: true,
  states: {
    idle: {
      states: {
        waitingForFetch: {},
        waitingForFavourite: {},
      },
      on: {
        FETCH_RELEASES: 'fetchingReleases',
        FAVOURITE: 'addingFavourite',
        REMOVE_FAVOURITE: 'removingFavourite',
      },
    },
    fetchingReleases: {
      onEntry: ['FETCH_RELEASES', 'SHOW_LOADING'],
      on: {
        FETCH_SUCCESS: 'idle.waitingForFavourite',
        FETCH_FAILURE: 'idle.waitingForFavourite',
      },
      onExit: ['HIDE_LOADING'],
    },
    addingFavourite: {
      onEntry: ['ADD_FAVOURITE', 'SHOW_LOADING'],
      on: {
        FAVOURITE_SUCCESS: 'idle.waitingForFavourite',
        FAVOURITE_FAILURE: 'idle.waitingForFavourite',
      },
      onExit: ['HIDE_LOADING'],
    },
    removingFavourite: {
      onEntry: ['REMOVE_FAVOURITE', 'SHOW_LOADING'],
      on: {
        REMOVE_FAVOURITE_SUCCESS: 'idle.waitingForFavourite',
        REMOVE_FAVOURITE_FAILURE: 'idle.waitingForFavourite',
      },
      onExit: ['HIDE_LOADING'],
    },
  },
})
