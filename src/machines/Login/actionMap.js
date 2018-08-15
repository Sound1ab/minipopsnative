import { saveCognitoUserObject, removeCognitoUserObject } from './actions'
import { Auth } from 'aws-amplify'
import { uiActionMap } from '../App/genericActionMap'
import { APP_MACHINE_ACTIONS } from '../App/actions'

export const actionMap = {
  ...uiActionMap,
  async SIGN_IN({ payload, actions }) {
    try {
      const cognitoUser = await Auth.signIn(payload.username, payload.password)
      actions.SIGN_IN_SUCCESS(cognitoUser)
    } catch (error) {
      actions.SIGN_IN_FAILURE(error)
    }
  },
  async SIGN_OUT({ payload, actions }) {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      await currentUser.signOut()
      actions.SIGN_OUT_SUCCESS(currentUser)
    } catch (error) {
      actions.SIGN_OUT_FAILURE(error)
    }
  },
  SAVE_COGNITO_USER_OBJECT({ dispatch, payload }) {
    dispatch(saveCognitoUserObject(payload))
  },
  REMOVE_COGNITO_USER_OBJECT({ dispatch }) {
    dispatch(removeCognitoUserObject())
  },
  REDIRECT_TO_APP({ dispatch }) {
    dispatch(APP_MACHINE_ACTIONS.SIGN_IN())
  },
  REDIRECT_TO_LOGIN({ dispatch }) {
    dispatch(APP_MACHINE_ACTIONS.SIGN_OUT())
  },
  async CONFIRM_USER({ payload, actions }) {
    try {
      await Auth.confirmSignIn(payload.cognitoUser, payload.code)
      actions.SIGN_IN_SUCCESS(payload)
    } catch (error) {
      actions.SIGN_IN_FAILURE(error)
    }
  },
  async POST_USER_ATTRIBUTES({ payload, actions }) {
    try {
      await Auth.updateUserAttributes(
        await Auth.currentAuthenticatedUser(),
        payload.form,
      )
      const updatedUser = await Auth.currentAuthenticatedUser()
      actions.POST_USER_ATTRIBUTES_SUCCESS(updatedUser)
    } catch (error) {
      actions.POST_USER_ATTRIBUTES_FAILURE(error)
    }
  },
  async POST_NEW_PASSWORD({ payload, actions }) {
    try {
      await Auth.changePassword(
        await Auth.currentAuthenticatedUser(),
        payload.currentPassword,
        payload.password,
      )
      actions.POST_NEW_PASSWORD_SUCCESS()
    } catch (error) {
      actions.POST_NEW_PASSWORD_FAILURE(error)
    }
  },
}
