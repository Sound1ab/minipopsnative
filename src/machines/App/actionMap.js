import { Auth } from 'aws-amplify'
import { Request } from '../../services'
import { API } from '../../services'
import { saveFavourites, saveWatchList } from '../Discovery/actions'
import {
  startApp,
  startLogin,
  registerComponents,
} from '../../navigation/index'
import { uiActionMap } from './genericActionMap'
import { saveCognitoUserObject } from '../Login/actions'

export const actionMap = {
  ...uiActionMap,
  REGISTER_COMPONENTS({ actions }) {
    registerComponents()
    actions.REGISTER_COMPONENTS_SUCCESS()
  },
  async CHECK_AUTHENTICATED_USER({ actions }) {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser()
      const { id } = await Auth.currentUserInfo()
      actions.AUTHENTICATED_SUCCESS({ id, ...cognitoUser })
    } catch (error) {
      actions.AUTHENTICATED_FAILURE(error)
    }
  },
  async FETCHING_FAVOURITES({ dispatch, actions, payload }) {
    try {
      const favourites = await Request.get(API('get-want-list'), {
        id: payload.id,
      })
      dispatch(saveFavourites(favourites.data))
      actions.FETCH_FAVOURITES_SUCCESS(payload)
    } catch (error) {
      actions.FETCH_FAVOURITES_FAILURE(error)
    }
  },
  async FETCHING_WATCH_LIST({ dispatch, actions, payload }) {
    try {
      const watchList = await Request.get(API('get-watch-list'), {
        id: payload.id,
      })
      dispatch(saveWatchList({ items: watchList.data }))
      actions.FETCH_WATCH_LIST_SUCCESS(payload)
    } catch (error) {
      actions.FETCH_WATCH_LIST_FAILURE(error)
    }
  },
  async REDIRECT_TO_APP({ actions, payload }) {
    await startApp()
    actions.LOAD_SUCCESS(payload)
  },
  async REDIRECT_TO_LOGIN({ actions, payload }) {
    await startLogin()
    actions.LOAD_SUCCESS(payload)
  },
  SAVE_COGNITO_USER_OBJECT({ dispatch, payload }) {
    dispatch(saveCognitoUserObject(payload))
  },
  async UPDATE_DEVICE_TOKEN_REMOTELY({ dispatch, payload, state, actions }) {
    if (!state.localNotifications.deviceToken || !payload.id) {
      actions.UPDATE_TOKEN_REMOTELY_FAILURE('no device token or id')
      return
    }
    try {
      await Request.post(API('update-device-token'), {
        id: payload.id,
        deviceToken: state.localNotifications.deviceToken,
      })
      actions.UPDATE_TOKEN_REMOTELY_SUCCESS(payload)
    } catch (error) {
      console.warn(`could not update device token: ${error}`)
      actions.UPDATE_TOKEN_REMOTELY_FAILURE(error)
    }
  },
}
