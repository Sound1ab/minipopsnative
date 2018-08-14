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
        SIGN_IN: 'checkingAuthenticatedUser',
        SIGN_OUT: 'loadingLogin',
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
        // AUTHENTICATED_SUCCESS: 'loadingLogin',
        AUTHENTICATED_FAILURE: 'loadingLogin',
        // AUTHENTICATED_FAILURE: 'loadingApp',
      },
    },
    loadingApp: {
      onEntry: ['REDIRECT_TO_APP', 'SAVE_COGNITO_USER_OBJECT'],
      on: {
        LOAD_SUCCESS: 'fetchingInitialData',
      },
    },
    loadingLogin: {
      onEntry: ['REDIRECT_TO_LOGIN'],
      on: {
        LOAD_SUCCESS: 'idle',
      },
    },
    fetchingInitialData: {
      initial: 'fetchingFavourites',
      states: {
        fetchingFavourites: {
          onEntry: ['FETCHING_FAVOURITES'],
          on: {
            FETCH_FAVOURITES_SUCCESS: 'fetchingWatchList',
            FETCH_FAVOURITES_FAILURE: {
              fetchingWatchList: { actions: ['SHOW_ERROR_MESSAGE'] },
            },
          },
        },
        fetchingWatchList: {
          onEntry: ['FETCHING_WATCH_LIST'],
        },
      },
      on: {
        FETCH_WATCH_LIST_SUCCESS: 'updateTokenRemotely',
        FETCH_WATCH_LIST_FAILURE: {
          updateTokenRemotely: { actions: ['SHOW_ERROR_MESSAGE'] },
        },
      },
    },
    updateTokenRemotely: {
      onEntry: ['UPDATE_DEVICE_TOKEN_REMOTELY'],
      on: {
        UPDATE_TOKEN_REMOTELY_SUCCESS: 'idle',
        UPDATE_TOKEN_REMOTELY_FAILURE: 'idle',
      },
    },
  },
})
