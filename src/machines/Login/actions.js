// @flow
import { machine } from './machine'
import { actionMap } from './actionMap'
import { RXState } from '../../store/middleware/rxstate'

const rXState = new RXState(machine, actionMap)
export const LOGIN_MACHINE_ACTIONS = rXState.getActionCreators()

export const SAVE_COGNITO_USER_OBJECT = 'SAVE_COGNITO_USER_OBJECT'
export const REMOVE_COGNITO_USER_OBJECT = 'REMOVE_COGNITO_USER_OBJECT'

export const saveCognitoUserObject = payload => ({
  type: SAVE_COGNITO_USER_OBJECT,
  payload,
})

export const removeCognitoUserObject = () => ({
  type: REMOVE_COGNITO_USER_OBJECT,
})
