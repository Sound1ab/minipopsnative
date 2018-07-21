import { Machine } from 'xstate'

const id = 'signIn'

export const signInMachine = Machine({
  id,
  initial: 'idle',
  strict: true,
  states: {
    idle: {
      states: {
        waitingForSignIn: {},
        waitingForConfirmation: {},
        waitingForSignOut: {},
      },
      on: {
        SIGN_IN: 'signingIn',
        CONFIRM_USER: 'confirmingUser',
        CHECK_SESSION: 'checkingAuthenticatedUser',
      },
    },
    checkingAuthenticatedUser: {
      onEntry: ['CHECK_AUTHENTICATED_USER'],
      on: {
        AUTHENTICATED_SUCCESS: {
          'idle.waitingForSignOut': {
            actions: ['SAVE_COGNITO_USER_OBJECT', 'REDIRECT_TO_APP'],
          },
        },
        AUTHENTICATED_FAILURE: 'idle.waitingForSignIn',
      },
    },
    signingIn: {
      onEntry: ['SIGN_IN'],
      on: {
        SIGN_IN_SUCCESS: {
          'idle.waitingForSignOut': {
            actions: ['SAVE_COGNITO_USER_OBJECT', 'REDIRECT_TO_APP'],
          },
        },
        SIGN_IN_FAILURE: {
          ['idle.waitingForSignIn']: {
            actions: ['SHOW_ERROR_MESSAGE'],
          },
        },
      },
    },
    confirmingUser: {
      onEntry: ['CONFIRM_USER'],
      on: {
        CONFIRMATION_SUCCESS: {
          'idle.waitingForSignOut': {
            actions: ['REDIRECT_TO_APP'],
          },
        },
        CONFIRMATION_FAILURE: {
          ['idle.waitingForSignIn']: {
            actions: ['SHOW_ERROR_MESSAGE'],
          },
        },
      },
    },
  },
})
