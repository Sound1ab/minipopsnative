import { SIGN_IN_MACHINE_ACTIONS, saveCognitoUserObject } from './actions'
import { Auth } from 'aws-amplify'
import App from '../../App'

export const actionMap = {
  async CHECK_AUTHENTICATED_USER({ dispatch }) {
    let cognitoUser
    try {
      cognitoUser = await Auth.currentAuthenticatedUser()
    } catch (error) {
      cognitoUser = {}
    }
    if (Object.keys(cognitoUser).length > 0) {
      dispatch(SIGN_IN_MACHINE_ACTIONS.AUTHENTICATED_SUCCESS(cognitoUser))
    } else {
      dispatch(SIGN_IN_MACHINE_ACTIONS.AUTHENTICATED_FAILURE())
    }
  },
  async SIGN_IN({ dispatch, payload }) {
    try {
      const cognitoUser = await Auth.signIn(payload.username, payload.password)
      dispatch(SIGN_IN_MACHINE_ACTIONS.SIGN_IN_SUCCESS(cognitoUser))
    } catch (error) {
      dispatch(SIGN_IN_MACHINE_ACTIONS.SIGN_IN_FAILURE(error))
    }
  },
  SAVE_COGNITO_USER_OBJECT({ dispatch, payload }) {
    dispatch(saveCognitoUserObject(payload))
  },
  REDIRECT_TO_APP() {
    const app = new App()
    app.startApp()
  },
  async CONFIRM_USER({ dispatch, payload }) {
    try {
      await Auth.confirmSignIn(payload.cognitoUser, payload.code)
      dispatch(SIGN_IN_MACHINE_ACTIONS.SIGN_IN_SUCCESS(payload))
    } catch (error) {
      dispatch(SIGN_IN_MACHINE_ACTIONS.SIGN_IN_FAILURE(error))
    }
  },
  SHOW_ERROR_MESSAGE({ dispatch, payload }) {
    console.warn('SHOW_ERROR_MESSAGE', payload)
  },
}
