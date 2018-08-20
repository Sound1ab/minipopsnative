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
        AUTHENTICATED_SUCCESS: 'updatingUserData.savingCognitoUserObject',
        AUTHENTICATED_FAILURE: 'redirecting.toLogin',
      },
    },
    signingIn: {
      onEntry: ['SIGN_IN', 'SHOW_LOADING'],
      on: {
        SIGN_IN_SUCCESS: 'checkingAuthenticatedUser',
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
        SIGN_OUT_SUCCESS: 'updatingUserData.removingUserData',
        SIGN_OUT_FAILURE: {
          ['idle.waitingForSignOut']: {
            actions: ['SHOW_ERROR_MESSAGE'],
          },
        },
      },
      onExit: ['HIDE_LOADING'],
    },
    updatingUserData: {
      states: {
        savingCognitoUserObject: {
          onEntry: ['SAVE_COGNITO_USER_OBJECT'],
        },
        removingUserData: {
          onEntry: ['REMOVE_USER_DATA'],
        },
      },
      on: {
        SAVE_COGNITO_USER_OBJECT_SUCCESS: 'redirecting.toApp',
        REMOVE_USER_DATA_SUCCESS: 'redirecting.toLogin',
      },
    },
    redirecting: {
      states: {
        toApp: {
          onEntry: ['REDIRECT_TO_APP'],
        },
        toLogin: {
          onEntry: ['REDIRECT_TO_LOGIN'],
        },
      },
      on: {
        REDIRECT_TO_APP_SUCCESS: 'idle.waitingForSignOut',
        REDIRECT_TO_LOGIN_SUCCESS: 'idle.waitingForSignIn',
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
