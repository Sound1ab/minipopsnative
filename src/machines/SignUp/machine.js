import { Machine } from 'xstate'

const id = 'signUp'

export const machine = Machine({
  id,
  initial: 'idle',
  strict: true,
  states: {
    idle: {
      initial: 'waitingForSignup',
      states: {
        waitingForSignup: {},
        waitingForConfirmation: {},
      },
      on: {
        SIGN_UP: 'signingUp',
        CONFIRM_USER: 'confirmingUser',
      },
    },
    signingUp: {
      onEntry: ['SIGN_UP', 'SHOW_LOADING'],
      on: {
        SIGN_UP_SUCCESS: 'idle.waitingForConfirmation',
        SIGN_UP_FAILURE: {
          ['idle.waitingForSignup']: {
            actions: ['SHOW_ERROR_MESSAGE'],
          },
        },
      },
      onExit: ['HIDE_LOADING'],
    },
    confirmingUser: {
      onEntry: ['CONFIRM_USER', 'SHOW_LOADING'],
      on: {
        CONFIRMATION_SUCCESS: {
          idle: {
            actions: ['REDIRECT_TO_LOGIN'],
          },
        },
        CONFIRMATION_FAILURE: {
          ['idle.waitingForConfirmation']: {
            actions: ['SHOW_ERROR_MESSAGE'],
          },
        },
      },
      onExit: ['HIDE_LOADING'],
    },
  },
})
