import axios from 'axios'
import {
  CREATE_FAVOURITES,
  CREATE_USER,
  CREATE_WATCHING,
  READ_USER,
} from '../../graphQL'
import { Request } from '../../services'
import { saveCognitoUserObject, removeUserData } from './actions'
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
      const session = await Auth.currentSession()
      const user = await Auth.currentUserInfo()
      try {
        await Request.query(READ_USER.query, { id: user.id })
      } catch (error) {
        Promise.all([
          Request.mutate(CREATE_USER.mutation, { id: user.id }),
          Request.mutate(CREATE_FAVOURITES.mutation, { id: user.id }),
          Request.mutate(CREATE_WATCHING.mutation, { id: user.id }),
        ])
      }
      dispatchMachineAction('AUTHENTICATED_SUCCESS', { ...session, ...user })
    } catch (error) {
      dispatchMachineAction('AUTHENTICATED_FAILURE', {
        notification: false,
        title: 'Check authenticated user',
        error,
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
    axios.defaults.headers.common['Authorization'] = payload.idToken.jwtToken
    dispatchReduxAction(saveCognitoUserObject(payload))
    dispatchMachineAction('SAVE_COGNITO_USER_OBJECT_SUCCESS', payload)
  },
  REMOVE_USER_DATA({ dispatchReduxAction, dispatchMachineAction }) {
    dispatchReduxAction(removeUserData())
    dispatchMachineAction('REMOVE_USER_DATA_SUCCESS')
  },
  REDIRECT_TO_APP({ dispatchMachineAction }) {
    appMachine.dispatchAction('SET_THEME', { isAuthenticated: true })
    dispatchMachineAction('REDIRECT_TO_APP_SUCCESS')
  },
  REDIRECT_TO_LOGIN({ dispatchMachineAction }) {
    appMachine.dispatchAction('SET_THEME', { isAuthenticated: false })
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
