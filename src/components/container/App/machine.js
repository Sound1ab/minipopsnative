import { Machine } from 'xstate'

const id = 'app'

export const appMachine = Machine({
  id,
  initial: 'idle',
  strict: true,
  states: {
    idle: {
      on: {
        INIT: 'registeringComponents',
        LOAD_APP: 'loadingApp',
      },
    },
    registeringComponents: {
      onEntry: ['REGISTER_COMPONENTS'],
      on: {
        REGISTER_COMPONENTS_SUCCESS: 'checkingAuthenticatedUser',
      },
    },
    checkingAuthenticatedUser: {
      onEntry: ['CHECK_AUTHENTICATED_USER'],
      on: {
        AUTHENTICATED_SUCCESS: 'loadingApp',
        AUTHENTICATED_FAILURE: 'loadingLogin',
      },
    },
    loadingApp: {
      onEntry: ['REDIRECT_TO_APP'],
      on: {
        LOAD_SUCCESSFUL: 'idle',
      },
    },
    loadingLogin: {
      onEntry: ['REDIRECT_TO_LOGIN'],
      on: {
        LOAD_SUCCESSFUL: 'idle',
      },
    },
  },
})
