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
        TIMER_COUNTDOWN_PASSED: 'dispatchingSearch',
        UPDATE_SEARCH: {
          searching: {
            actions: ['UPDATE_SEARCH'],
          },
        },
      },
    },
    dispatchingSearch: {
      onEntry: ['DISPATCHING_SEARCH', 'SHOW_LOADING'],
      on: {
        SEARCH_SUCCESS: 'searching.searchReady',
        SEARCH_FAILURE: 'searching.searchReady',
      },
      onExit: ['HIDE_LOADING'],
    },
  },
})
