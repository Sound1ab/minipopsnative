// @flow
import { signUpMachine } from './machine'
import { actionMap } from './actionMap'
import { RXState } from '../../../store/middleware/rxstate'

const rXState = new RXState(signUpMachine, actionMap)
export const SIGN_UP_MACHINE_ACTIONS = rXState.getActionCreators()

console.log(SIGN_UP_MACHINE_ACTIONS)
