// @flow
import { appMachine } from './machine'
import { actionMap } from './actionMap'
import { RXState } from '../../store/middleware/rxstate'

export const rXState = new RXState(appMachine, actionMap)
export const APP_MACHINE_ACTIONS = rXState.getActionCreators()
