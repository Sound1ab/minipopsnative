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
        SIGN_OUT: 'signingOut',
        CONFIRM_USER: 'confirmingUser',
      },
    },
    signingIn: {
      onEntry: ['SIGN_IN', 'SHOW_LOADING'],
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
      onExit: ['HIDE_LOADING'],
    },
    signingOut: {
      onEntry: ['SIGN_OUT', 'SHOW_LOADING'],
      on: {
        SIGN_OUT_SUCCESS: {
          'idle.waitingForSignIn': {
            actions: ['REMOVE_COGNITO_USER_OBJECT', 'REDIRECT_TO_LOGIN'],
          },
        },
        SIGN_OUT_FAILURE: {
          ['idle.waitingForSignOut']: {
            actions: ['SHOW_ERROR_MESSAGE'],
          },
        },
      },
      onExit: ['HIDE_LOADING'],
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
