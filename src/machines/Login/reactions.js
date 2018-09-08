import axios from 'axios'
import { saveCognitoUserObject, removeUserData } from './actions'
import { removeDiscoveryData } from '../Discovery'
import { removeFeedData } from '../Feed'
import { removeSearchResults } from '../SearchField'
import { Auth } from 'aws-amplify'
import { appMachine } from '../App'
import { inAppNotification } from '../../navigation'
import { reactions as appReactions } from '../App'

const { SHOW_LOADING, HIDE_LOADING, SHOW_ERROR_MESSAGE } = appReactions

export const reactions = {
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_ERROR_MESSAGE,
  async CHECK_AUTHENTICATED_USER({ dispatchMachineAction }) {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser()
      const { id } = await Auth.currentUserInfo()
      dispatchMachineAction('AUTHENTICATED_SUCCESS', { id, ...cognitoUser })
    } catch (error) {
      dispatchMachineAction('AUTHENTICATED_FAILURE', {
        notification: false,
        title: 'Check authenticated user',
        message: error,
      })
    }
  },
  async SIGN_IN({ payload, dispatchMachineAction }) {
    try {
      await Auth.signIn(payload.username, payload.password)
      dispatchMachineAction('SIGN_IN_SUCCESS')
    } catch (error) {
      dispatchMachineAction('SIGN_IN_FAILURE', {
        notification: true,
        message: "Oh no, I can't sign in right now",
        error,
      })
    }
  },
  async SIGN_OUT({ payload, dispatchMachineAction }) {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      await currentUser.signOut()
      dispatchMachineAction('SIGN_OUT_SUCCESS')
    } catch (error) {
      dispatchMachineAction('SIGN_OUT_FAILURE', {
        notification: true,
        message: "Oh no, I can't sign out right now",
      })
    }
  },
  SAVE_COGNITO_USER_OBJECT({
    dispatchReduxAction,
    dispatchMachineAction,
    payload,
  }) {
    axios.defaults.headers.common['Authorization'] =
      payload.signInUserSession.idToken.jwtToken
    dispatchReduxAction(saveCognitoUserObject(payload))
    dispatchMachineAction('SAVE_COGNITO_USER_OBJECT_SUCCESS', payload)
  },
  REMOVE_USER_DATA({ dispatchReduxAction, dispatchMachineAction }) {
    dispatchReduxAction(removeUserData())
    dispatchReduxAction(removeDiscoveryData())
    dispatchReduxAction(removeFeedData())
    dispatchReduxAction(removeSearchResults())
    dispatchMachineAction('REMOVE_USER_DATA_SUCCESS')
  },
  REDIRECT_TO_APP({ dispatchMachineAction }) {
    appMachine.dispatchAction('REGISTER_COMPONENTS', { isAuthenticated: true })
    dispatchMachineAction('REDIRECT_TO_APP_SUCCESS')
  },
  REDIRECT_TO_LOGIN({ dispatchMachineAction }) {
    appMachine.dispatchAction('REGISTER_COMPONENTS', { isAuthenticated: false })
    dispatchMachineAction('REDIRECT_TO_LOGIN_SUCCESS')
  },
  async CONFIRM_USER({ payload, dispatchMachineAction }) {
    try {
      await Auth.confirmSignIn(payload.cognitoUser, payload.code)
      dispatchMachineAction('SIGN_IN_SUCCESS', payload)
    } catch (error) {
      dispatchMachineAction('SIGN_IN_FAILURE', {
        notification: true,
        message: 'Oh no, something went wrong, please try again',
      })
    }
  },
  async POST_USER_ATTRIBUTES({ payload, dispatchMachineAction }) {
    try {
      await Auth.updateUserAttributes(
        await Auth.currentAuthenticatedUser(),
        payload.form,
      )
      const updatedUser = await Auth.currentAuthenticatedUser()
      dispatchMachineAction('POST_USER_ATTRIBUTES_SUCCESS', updatedUser)
      inAppNotification({
        title: '💁',
        message: 'Your details have been updated!',
        timeout: 500,
      })
    } catch (error) {
      dispatchMachineAction('POST_USER_ATTRIBUTES_FAILURE', {
        notification: true,
        message: "Oh no, we couldn't update your details, please try again",
      })
    }
  },
  async POST_NEW_PASSWORD({ payload, dispatchMachineAction }) {
    try {
      await Auth.changePassword(
        await Auth.currentAuthenticatedUser(),
        payload.currentPassword,
        payload.password,
      )
      dispatchMachineAction('POST_NEW_PASSWORD_SUCCESS')
      inAppNotification({
        title: '💁',
        message: 'Your new password has been saved',
        timeout: 500,
      })
    } catch (error) {
      dispatchMachineAction('POST_NEW_PASSWORD_FAILURE', {
        notification: true,
        message: "Oh no, we couldn't save your new password, please try again",
      })
    }
  },
}
