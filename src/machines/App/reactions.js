import { Request } from '../../services'
import { AsyncStorage } from 'react-native'
import { UPDATE_USER } from '../../graphQL'
import {
  updateLoading,
  saveToken,
  updateNetInfoStatus,
  saveTheme,
} from './actions'
import {
  startApp,
  startLogin,
  registerComponents,
  inAppNotification,
} from '../../navigation'
import get from 'lodash/get'

export const reactions = {
  SHOW_LOADING({ dispatchReduxAction }) {
    dispatchReduxAction(updateLoading(true))
  },
  HIDE_LOADING({ dispatchReduxAction }) {
    dispatchReduxAction(updateLoading(false))
  },
  SHOW_ERROR_MESSAGE({ payload }) {
    if (payload.notification) {
      inAppNotification({
        title: '🤦‍♀',
        message: get(payload, 'message', ''),
        timeout: 500,
      })
      __DEV__ && payload.error && console.warn(payload.error)
    } else {
      __DEV__ &&
        console.warn(
          `${payload.title}: `,
          payload.message ? payload.message : '',
          payload.error ? payload.error : '',
        )
    }
  },
  async SET_THEME({ dispatchMachineAction, dispatchReduxAction, payload }) {
    let theme = 'darkMode'

    try {
      const value = await AsyncStorage.getItem('@Minipops:theme')
      if (value !== null) {
        theme = value
      }
    } catch (error) {}

    dispatchReduxAction(saveTheme({ theme }))
    dispatchMachineAction('THEME_SET', payload)
  },
  async UPDATE_THEME({ dispatchMachineAction, dispatchReduxAction, payload }) {
    try {
      await AsyncStorage.setItem('@Minipops:theme', payload)
    } catch (error) {}
    inAppNotification({
      title: '🎉',
      message: 'Please reset the app to see the changes!',
      timeout: 500,
    })
    dispatchMachineAction('THEME_SET', payload)
  },
  REGISTER_COMPONENTS({ dispatchMachineAction, payload }) {
    registerComponents()
    payload.isAuthenticated
      ? dispatchMachineAction('LOAD_APP')
      : dispatchMachineAction('LOAD_LOGIN')
  },
  async REDIRECT_TO_APP({ dispatchMachineAction, payload }) {
    await startApp()
    dispatchMachineAction('LOAD_SUCCESS', payload)
  },
  async REDIRECT_TO_LOGIN({ dispatchMachineAction, payload }) {
    await startLogin()
    dispatchMachineAction('LOAD_SUCCESS', payload)
  },
  SAVE_TOKEN_LOCALLY({ payload, dispatchMachineAction, dispatchReduxAction }) {
    dispatchReduxAction(saveToken(payload))
    dispatchMachineAction('TOKEN_SAVED_LOCALLY', payload)
  },
  NOTIFY_NETINFO_STATUS({ payload, dispatchReduxAction }) {
    if (payload.status === 'offline' && !payload.initial) {
      inAppNotification({
        title: '❌',
        message: "Oh no, looks like you've gone offline",
        timeout: 500,
      })
    } else if (payload.status === 'online' && !payload.initial) {
      inAppNotification({
        title: '🎉',
        message: "Woo, we're back online, baby!",
        timeout: 500,
      })
    }
    dispatchReduxAction(
      updateNetInfoStatus({ isOnline: payload.status === 'online' }),
    )
  },
  async UPDATE_DEVICE_TOKEN_REMOTELY({
    dispatchReduxAction,
    payload,
    dispatchMachineAction,
    reduxState,
  }) {
    if (!reduxState.app.deviceToken || !reduxState.login.cognitoUser.id) {
      dispatchMachineAction('UPDATE_TOKEN_REMOTELY_FAILURE', {
        notification: false,
        title: 'Watch fetch failure',
        message: 'no id or deviceToken in store',
      })
      return
    }
    try {
      await Request.mutate(UPDATE_USER.mutation, {
        id: reduxState.login.cognitoUser.id,
        deviceToken: reduxState.app.deviceToken,
      })
      dispatchMachineAction('UPDATE_TOKEN_REMOTELY_SUCCESS', payload)
    } catch (error) {
      dispatchMachineAction('UPDATE_TOKEN_REMOTELY_FAILURE', {
        notification: false,
        title: 'UPDATE_TOKEN_REMOTELY_FAILURE',
        message: error,
      })
    }
  },
}
