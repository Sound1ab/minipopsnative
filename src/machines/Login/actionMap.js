import { saveCognitoUserObject, removeCognitoUserObject } from './actions'
import { Auth } from 'aws-amplify'
import { startApp, startLogin } from '../../navigation/index'
import { uiActionMap } from '../App/genericActionMap'
import { APP_MACHINE_ACTIONS } from '../App/actions'

console.log('uiActionMap', uiActionMap)

export const actionMap = {
  ...uiActionMap,
  async SIGN_IN({ payload, actions }) {
    try {
      await Auth.signIn(payload.username, payload.password)
      actions.SIGN_IN_SUCCESS()
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
}
