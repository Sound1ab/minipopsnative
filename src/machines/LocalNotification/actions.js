// @flow
import { machine } from './machine'
import { actionMap } from './actionMap'
import { RXState } from '../../store/middleware/rxstate'

const rXState = new RXState(machine, actionMap)
export const NOTIFICATION_MACHINE_ACTIONS = rXState.getActionCreators()

export const UPDATE_LOCAL_NOTIFICATIONS = 'UPDATE_LOCAL_NOTIFICATIONS'
export const SAVE_TOKEN = 'SAVE_TOKEN'

export const updateLocalNotifications = payload => ({
  type: UPDATE_LOCAL_NOTIFICATIONS,
  payload,
})

export const saveToken = payload => ({
  type: SAVE_TOKEN,
  payload,
})
