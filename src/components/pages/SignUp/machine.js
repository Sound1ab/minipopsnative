import { Machine } from 'xstate'

const id = 'signUp'

export const signUpMachine = Machine({
  id,
  initial: 'idle',
  strict: true,
  states: {
    idle: {
      on: {
        SIGN_UP: 'signingUp',
      },
      onExit: ['SIGN_UP'],
    },
    signingUp: {
      on: {
        SIGN_UP_SUCCESS: {
          confirmingUser: {
            actions: ['CONFIRM_USER'],
          },
        },
        SIGN_UP_FAILURE: {
          idle: {
            actions: ['SHOW_ERROR_MESSAGE'],
          },
        },
      },
    },
    confirmingUser: {
      on: {
        CONFIRMATION_SUCCESS: {
          idle: {
            actions: ['REDIRECT_TO_LOGIN'],
          },
        },
        CONFIRMATION_FAILURE: {
          confirmingUser: {
            actions: ['SHOW_ERROR_MESSAGE'],
          },
        },
      },
    },
  },
})
