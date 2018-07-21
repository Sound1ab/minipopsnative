// @flow
import { signInMachine } from './machine'
import { actionMap } from './actionMap'
import { RXState } from '../../../store/middleware/rxstate'

const rXState = new RXState(signInMachine, actionMap)
export const SIGN_IN_MACHINE_ACTIONS = rXState.getActionCreators()

export const SAVE_COGNITO_USER_OBJECT = 'SAVE_COGNITO_USER_OBJECT'

export const saveCognitoUserObject = payload => ({
  type: SAVE_COGNITO_USER_OBJECT,
  payload,
})
