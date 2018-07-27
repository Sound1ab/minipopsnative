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
        // AUTHENTICATED_FAILURE: 'loadingApp',
      },
    },
    loadingApp: {
      onEntry: ['REDIRECT_TO_APP', 'SAVE_COGNITO_USER_OBJECT'],
      on: {
        LOAD_SUCCESS: 'fetchingFavourites',
      },
    },
    fetchingFavourites: {
      onEntry: ['FETCHING_FAVOURITES'],
      on: {
        FETCH_SUCCESS: 'idle',
        FETCH_FAILURE: { idle: { actions: ['SHOW_ERROR_MESSAGE'] } },
      },
    },
    loadingLogin: {
      onEntry: ['REDIRECT_TO_LOGIN'],
      on: {
        LOAD_SUCCESS: 'idle',
      },
    },
  },
})
