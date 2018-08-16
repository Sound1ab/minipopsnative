import { Machine } from 'xstate'

const id = 'localNotifications'

export const machine = Machine({
  id,
  initial: 'idle',
  strict: true,
  states: {
    idle: {
      on: {
        SAVE_TOKEN: 'savingToken',
      },
    },
    savingToken: {
      onEntry: ['SAVE_TOKEN_LOCALLY'],
      on: {
        TOKEN_SAVED_LOCALLY: 'idle',
      },
    },
  },
})
