import { Machine } from 'xstate'

const id = 'compare'

export const machine = Machine({
  id,
  initial: 'idle',
  strict: true,
  states: {
    idle: {
      on: {
        FETCH_PRODUCTS: 'fetchingProducts',
        REMOVE_PRODUCTS: 'removingProducts',
      },
    },
    fetchingProducts: {
      onEntry: ['FETCH_PRODUCTS', 'SHOW_LOADING'],
      on: {
        FETCH_SUCCESS: 'idle',
        FETCH_FAILURE: { idle: { actions: ['SHOW_ERROR_MESSAGE'] } },
      },
      onExit: ['HIDE_LOADING'],
    },
    removingProducts: {
      onEntry: ['REMOVE_PRODUCTS'],
      on: {
        REMOVE_SUCCESS: 'idle',
      },
    },
  },
})
