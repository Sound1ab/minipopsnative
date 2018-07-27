import { saveCognitoUserObject, removeCognitoUserObject } from './actions'
import { Auth } from 'aws-amplify'
import { startApp, startLogin } from '../../navigation/index'
import { uiActionMap } from '../App/genericActionMap'

console.log('uiActionMap', uiActionMap)

export const actionMap = {
  ...uiActionMap,
  async SIGN_IN({ payload, actions }) {
    try {
      const cognitoUser = await Auth.signIn(payload.username, payload.password)
      const { id } = await Auth.currentUserInfo()
      actions.SIGN_IN_SUCCESS({ id, ...cognitoUser })
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
      console.log(error)
      actions.SIGN_OUT_FAILURE(error)
    }
  },
  SAVE_COGNITO_USER_OBJECT({ dispatch, payload }) {
    dispatch(saveCognitoUserObject(payload))
  },
  REMOVE_COGNITO_USER_OBJECT({ dispatch }) {
    dispatch(removeCognitoUserObject())
  },
  REDIRECT_TO_APP() {
    startApp()
  },
  REDIRECT_TO_LOGIN() {
    startLogin()
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
