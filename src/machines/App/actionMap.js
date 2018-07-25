import { Auth } from 'aws-amplify'
import {
  startApp,
  startLogin,
  registerComponents,
} from '../../navigation/index'
import { uiActionMap } from './genericActionMap'

export const actionMap = {
  ...uiActionMap,
  REGISTER_COMPONENTS({ actions }) {
    registerComponents()
    actions.REGISTER_COMPONENTS_SUCCESS()
  },
  async CHECK_AUTHENTICATED_USER({ actions }) {
    let cognitoUser
    try {
      cognitoUser = await Auth.currentAuthenticatedUser()
    } catch (error) {
      cognitoUser = {}
    }
    if (Object.keys(cognitoUser).length > 0) {
      actions.AUTHENTICATED_SUCCESS(cognitoUser)
    } else {
      actions.AUTHENTICATED_FAILURE()
    }
  },
  REDIRECT_TO_APP() {
    startApp()
  },
  REDIRECT_TO_LOGIN() {
    startLogin()
  },
}
