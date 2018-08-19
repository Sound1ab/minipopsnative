import { Machine } from 'xstate'

const id = 'app'

export const machine = Machine({
  id,
  parallel: true,
  strict: true,
  states: {
    startUp: {
      initial: 'startUpIdle',
      states: {
        startUpIdle: {
          on: {
            INIT: 'registeringComponents',
            LOAD_APP: 'loadingApp',
            LOAD_LOGIN: 'loadingLogin',
          },
        },
        registeringComponents: {
          onEntry: ['REGISTER_COMPONENTS'],
          on: {
            REGISTER_COMPONENTS_SUCCESS: 'checkingAuthenticatedUser',
          },
        },
        loadingApp: {
          onEntry: ['REGISTER_COMPONENTS', 'REDIRECT_TO_APP'],
          on: {
            LOAD_SUCCESS: 'fetchingInitialData',
          },
        },
        loadingLogin: {
          onEntry: ['REGISTER_COMPONENTS', 'REDIRECT_TO_LOGIN'],
          on: {
            LOAD_SUCCESS: 'startUpIdle',
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
            UPDATE_TOKEN_REMOTELY_SUCCESS: 'startUpIdle',
            UPDATE_TOKEN_REMOTELY_FAILURE: 'startUpIdle',
          },
        },
      },
    },
    notifications: {
      initial: 'notificationIdle',
      states: {
        notificationIdle: {
          on: {
            SAVE_TOKEN_LOCALLY: 'savingTokenLocally',
            UPDATE_TOKEN_REMOTELY: 'updateTokenRemotely',
          },
        },
        savingTokenLocally: {
          onEntry: ['SAVE_TOKEN_LOCALLY'],
          on: {
            TOKEN_SAVED_LOCALLY: 'notificationIdle',
          },
        },
      },
    },
  },
})
