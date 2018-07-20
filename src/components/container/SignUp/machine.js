import { Machine } from 'xstate'

const id = 'signUp'

export const signUpMachine = Machine({
  id,
  initial: 'idle.waitingForSignup',
  strict: true,
  states: {
    idle: {
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
      onEntry: ['SIGN_UP'],
      on: {
        SIGN_UP_SUCCESS: 'idle.waitingForConfirmation',
        SIGN_UP_FAILURE: {
          ['idle.waitingForSignup']: {
            actions: ['SHOW_ERROR_MESSAGE'],
          },
        },
      },
    },
    confirmingUser: {
      onEntry: ['CONFIRM_USER'],
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
    },
  },
})
