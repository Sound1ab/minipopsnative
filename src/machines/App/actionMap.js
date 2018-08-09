import { Auth } from 'aws-amplify'
import { Request } from '../../services'
import { API } from '../../services'
import { saveFavourites } from '../Discovery/actions'
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
      actions.FETCH_SUCCESS()
    } catch (error) {
      actions.FETCH_FAILURE(error)
    }
  },
  REDIRECT_TO_APP({ actions, payload }) {
    startApp()
    actions.LOAD_SUCCESS(payload)
  },
  REDIRECT_TO_LOGIN({ actions, payload }) {
    startLogin()
    actions.LOAD_SUCCESS(payload)
  },
  SAVE_COGNITO_USER_OBJECT({ dispatch, payload }) {
    dispatch(saveCognitoUserObject(payload))
  },
  async UPDATE_DEVICE_TOKEN({ dispatch, payload, state }) {
    if (!state.localNotifications.deviceToken || !payload.id) {
      return
    }
    try {
      await Request.post(API('update-device-token'), {
        id: payload.id,
        deviceToken: state.localNotifications.deviceToken,
      })
    } catch (error) {
      console.warn(`could not update device token: ${error}`)
    }
  },
}
