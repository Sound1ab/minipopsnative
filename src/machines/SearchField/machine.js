import { Machine } from 'xstate'

const id = 'search'

export const internalMachine = {
  initial: 'searching',
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
        SUBMIT: 'fetchingSearch',
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
        FETCH_SUCCESS: 'updatingResults',
        FETCH_FAILURE: {
          'searching.searchReady': { actions: ['SHOW_ERROR_MESSAGE'] },
        },
        TEXT_INPUT: 'searching.typing',
      },
    },
    updatingResults: {
      onEntry: ['UPDATE_RESULTS'],
      on: {
        UPDATE_RESULTS_SUCCESS: 'searching.searchReady',
        TEXT_INPUT: 'searching.typing',
      },
      onExit: ['HIDE_LOADING'],
    },
  },
}

export const machine = Machine({
  id,
  strict: true,
  ...internalMachine,
})
