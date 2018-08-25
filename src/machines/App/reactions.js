import { Request } from '../../services'
import { API } from '../../services'
import { saveFavourites, saveWatchList } from '../Discovery/actions'
import { updateLoading, saveToken, updateNetInfoStatus } from './actions'
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
      payload.error && console.warn(`${payload.message}`, payload.error)
    } else {
      console.warn(
        `${payload.title}: `,
        payload.message,
        payload.error ? payload.error : '',
      )
    }
  },
  REGISTER_COMPONENTS({ dispatchMachineAction, payload }) {
    registerComponents()
    payload.isAuthenticated
      ? dispatchMachineAction('LOAD_APP')
      : dispatchMachineAction('LOAD_LOGIN')
  },
  async FETCHING_FAVOURITES({
    dispatchReduxAction,
    dispatchMachineAction,
    reduxState,
  }) {
    try {
      const favourites = await Request.get(API('get-want-list'), {
        id: reduxState.login.cognitoUser.id,
      })
      dispatchReduxAction(saveFavourites(favourites.data))
      dispatchMachineAction('FETCH_FAVOURITES_SUCCESS')
    } catch (error) {
      dispatchMachineAction('FETCH_FAVOURITES_FAILURE', {
        notification: true,
        message: "Oh no, I can't get your favourites right now",
      })
    }
  },
  async FETCHING_WATCH_LIST({
    dispatchReduxAction,
    dispatchMachineAction,
    payload,
    reduxState,
  }) {
    try {
      const watchList = await Request.get(API('get-watch-list'), {
        id: reduxState.login.cognitoUser.id,
      })
      dispatchReduxAction(saveWatchList({ items: watchList.data }))
      dispatchMachineAction('FETCH_WATCH_LIST_SUCCESS', payload)
    } catch (error) {
      dispatchMachineAction('FETCH_WATCH_LIST_FAILURE', {
        notification: false,
        title: 'Watch fetch failure',
        message: JSON.stringify(error),
      })
    }
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
      await Request.post(API('update-device-token'), {
        id: reduxState.login.cognitoUser.id,
        deviceToken: reduxState.app.deviceToken,
      })
      dispatchMachineAction('UPDATE_TOKEN_REMOTELY_SUCCESS', payload)
    } catch (error) {
      dispatchMachineAction('UPDATE_TOKEN_REMOTELY_FAILURE', {
        notification: false,
        title: 'Watch fetch failure',
        message: error,
      })
    }
  },
}
