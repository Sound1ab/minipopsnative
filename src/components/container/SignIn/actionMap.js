import { saveCognitoUserObject, removeCognitoUserObject } from './actions'
import { Auth } from 'aws-amplify'
import { startApp, startLogin } from '../../../navigation'
import { uiActionMap } from '../App/genericActionMap'

console.log('uiActionMap', uiActionMap)

export const actionMap = {
  ...uiActionMap,
  async SIGN_IN({ dispatch, payload, actions }) {
    try {
      const cognitoUser = await Auth.signIn(payload.username, payload.password)
      dispatch(actions.SIGN_IN_SUCCESS(cognitoUser))
    } catch (error) {
      dispatch(actions.SIGN_IN_FAILURE(error))
    }
  },
  async SIGN_OUT({ dispatch, payload, actions }) {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      await currentUser.signOut()
      dispatch(actions.SIGN_OUT_SUCCESS(currentUser))
    } catch (error) {
      console.log(error)
      dispatch(actions.SIGN_OUT_FAILURE(error))
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
  async CONFIRM_USER({ dispatch, payload, actions }) {
    try {
      await Auth.confirmSignIn(payload.cognitoUser, payload.code)
      dispatch(actions.SIGN_IN_SUCCESS(payload))
    } catch (error) {
      dispatch(actions.SIGN_IN_FAILURE(error))
    }
  },
  SHOW_ERROR_MESSAGE({ dispatch, payload, actions }) {
    console.warn('SHOW_ERROR_MESSAGE', payload)
  },
}
