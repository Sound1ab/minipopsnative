import { Request } from '../../services'
import { API } from '../../services'
import { saveFavourites, saveWatchList } from '../Discovery/actions'
import { updateLoading, saveToken } from './actions'
import { startApp, startLogin, registerComponents } from '../../navigation'
import { inAppNotification } from '../../navigation'
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
    } else {
      console.warn(`${payload.title}: `, payload.message)
    }
  },
  REGISTER_COMPONENTS({ dispatchMachineAction }) {
    registerComponents()
    dispatchMachineAction('REGISTER_COMPONENTS_SUCCESS')
  },
  async FETCHING_FAVOURITES({
    dispatchReduxAction,
    dispatchMachineAction,
    payload,
    reduxState,
  }) {
    try {
      const favourites = await Request.get(API('get-want-list'), {
        id: reduxState.login.cognitoUser.id,
      })
      dispatchReduxAction(saveFavourites(favourites.data))
      dispatchMachineAction('FETCH_FAVOURITES_SUCCESS', payload)
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
  async UPDATE_DEVICE_TOKEN_REMOTELY({
    dispatchReduxAction,
    payload,
    dispatchMachineAction,
    reduxState,
  }) {
    if (!reduxState.app.deviceToken || !payload.id) {
      dispatchMachineAction(
        'UPDATE_TOKEN_REMOTELY_FAILURE',
        'no device token or id',
      )
      return
    }
    try {
      await Request.post(API('update-device-token'), {
        id: payload.id,
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
