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
            SET_THEME: 'setTheme',
            UPDATE_THEME: 'updateTheme',
          },
        },
        updateTheme: {
          onEntry: ['UPDATE_THEME'],
          on: {
            THEME_SET: 'startUpIdle',
          },
        },
        setTheme: {
          onEntry: ['SET_THEME'],
          on: {
            THEME_SET: 'registeringComponents',
          },
        },
        registeringComponents: {
          onEntry: ['REGISTER_COMPONENTS'],
          on: {
            LOAD_APP: 'loadingApp',
            LOAD_LOGIN: 'loadingLogin',
          },
        },
        loadingApp: {
          onEntry: ['REDIRECT_TO_APP'],
          on: {
            LOAD_SUCCESS: 'startUpIdle',
          },
        },
        loadingLogin: {
          onEntry: ['REDIRECT_TO_LOGIN'],
          on: {
            LOAD_SUCCESS: 'updateTokenRemotely',
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
    netInfo: {
      initial: 'unknown',
      states: {
        unknown: {
          on: {
            ONLINE: 'online',
            OFFLINE: 'offline',
          },
        },
        online: {
          onEntry: ['NOTIFY_NETINFO_STATUS'],
          on: {
            OFFLINE: 'offline',
          },
        },
        offline: {
          onEntry: ['NOTIFY_NETINFO_STATUS'],
          on: {
            ONLINE: 'online',
          },
        },
      },
    },
  },
})
