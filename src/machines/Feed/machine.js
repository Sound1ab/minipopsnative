import { Machine } from 'xstate'

const id = 'feed'

export const machine = Machine({
  id,
  initial: 'idle',
  strict: true,
  states: {
    idle: {
      on: {
        FETCH_FEED: 'fetchingFeed',
      },
    },
    fetchingFeed: {
      onEntry: ['FETCH_FEED', 'SHOW_LOADING'],
      on: {
        FETCH_SUCCESS: 'idle',
        FETCH_FAILURE: { idle: { actions: ['SHOW_ERROR_MESSAGE'] } },
      },
      onExit: ['HIDE_LOADING'],
    },
  },
})
