import { Machine } from 'xstate'

const id = 'search'

export const searchMachine = Machine({
  id,
  initial: 'searching',
  strict: true,
  states: {
    searching: {
      initial: 'searchReady',
      states: {
        searchReady: {
          onEntry: ['CANCEL_TIMER'],
          on: {
            TEXT_INPUT: 'typing',
          },
        },
        typing: {
          onEntry: ['START_TIMER', 'CANCEL_OUTGOING_REQUEST'],
          on: {
            TEXT_INPUT_EMPTY: 'searchReady',
            TEXT_INPUT: 'typing',
          },
          onExit: ['UPDATE_SEARCH'],
        },
      },
      on: {
        TIMER_COUNTDOWN_PASSED: 'fetchingSearch',
        UPDATE_SEARCH: {
          searching: {
            actions: ['UPDATE_SEARCH'],
          },
        },
      },
    },
    fetchingSearch: {
      onEntry: ['FETCH_SEARCH', 'SHOW_LOADING'],
      on: {
        FETCH_SUCCESS: 'searching.searchReady',
        FETCH_FAILURE: {
          'searching.searchReady': { actions: ['SHOW_ERROR_MESSAGE'] },
        },
      },
      onExit: ['HIDE_LOADING'],
    },
  },
})
