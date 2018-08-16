// @flow
import { machine } from './machine'
import { actionMap } from './actionMap'
import { RXState } from '../../store/middleware/rxstate'

const rXState = new RXState(machine, actionMap)
export const NOTIFICATION_MACHINE_ACTIONS = rXState.getActionCreators()

export const SAVE_TOKEN = 'SAVE_TOKEN'

export const saveToken = payload => ({
  type: SAVE_TOKEN,
  payload,
})
