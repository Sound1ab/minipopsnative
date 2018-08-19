import { Machine } from 'xstate'

const id = 'login'

export const machine = Machine({
  id,
  initial: 'idle',
  strict: true,
  states: {
    idle: {
      initial: 'waitingForSignIn',
      states: {
        waitingForSignIn: {},
        waitingForConfirmation: {},
        waitingForSignOut: {},
      },
      on: {
        INIT: 'checkingAuthenticatedUser',
        SIGN_IN: 'signingIn',
        SIGN_OUT: 'signingOut',
        CONFIRM_USER: 'confirmingUser',
        UPDATE_USER_ATTRIBUTES: 'updatingUserAttributes',
        UPDATE_PASSWORD: 'updatingPassword',
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
        // AUTHENTICATED_SUCCESS: 'loadingLogin',
        AUTHENTICATED_FAILURE: {
          ['idle.waitingForSignIn']: {
            actions: ['REDIRECT_TO_LOGIN'],
          },
        },
        // AUTHENTICATED_FAILURE: 'loadingApp',
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
            actions: ['REDIRECT_TO_LOGIN', 'REMOVE_COGNITO_USER_OBJECT'],
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
    updatingUserAttributes: {
      onEntry: ['POST_USER_ATTRIBUTES', 'SHOW_LOADING'],
      on: {
        POST_USER_ATTRIBUTES_SUCCESS: {
          ['idle.waitingForSignOut']: {
            actions: ['SAVE_COGNITO_USER_OBJECT'],
          },
        },
        POST_USER_ATTRIBUTES_FAILURE: {
          ['idle.waitingForSignOut']: {
            actions: ['SHOW_ERROR_MESSAGE'],
          },
        },
      },
      onExit: ['HIDE_LOADING'],
    },
    updatingPassword: {
      onEntry: ['POST_NEW_PASSWORD', 'SHOW_LOADING'],
      on: {
        POST_NEW_PASSWORD_SUCCESS: 'idle.waitingForSignOut',
        POST_NEW_PASSWORD_FAILURE: {
          ['idle.waitingForSignOut']: {
            actions: ['SHOW_ERROR_MESSAGE'],
          },
        },
      },
      onExit: ['HIDE_LOADING'],
    },
  },
})
