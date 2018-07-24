import { Auth } from 'aws-amplify'
import { startApp, startLogin, registerComponents } from '../../../navigation'
import { uiActionMap } from './genericActionMap'

export const actionMap = {
  ...uiActionMap,
  REGISTER_COMPONENTS({ dispatch, actions }) {
    registerComponents()
    dispatch(actions.REGISTER_COMPONENTS_SUCCESS())
  },
  async CHECK_AUTHENTICATED_USER({ dispatch, actions }) {
    let cognitoUser
    try {
      cognitoUser = await Auth.currentAuthenticatedUser()
    } catch (error) {
      cognitoUser = {}
    }
    if (Object.keys(cognitoUser).length > 0) {
      dispatch(actions.AUTHENTICATED_SUCCESS(cognitoUser))
    } else {
      dispatch(actions.AUTHENTICATED_FAILURE())
    }
  },
  REDIRECT_TO_APP() {
    startApp()
  },
  REDIRECT_TO_LOGIN() {
    startLogin()
  },
}
