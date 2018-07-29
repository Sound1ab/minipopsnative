// @flow
import { machine } from './machine'
import { actionMap } from './actionMap'
import { RXState } from '../../store/middleware/rxstate'

const rXState = new RXState(machine, actionMap)
export const FEED_MACHINE_ACTIONS = rXState.getActionCreators()

export const SAVE_FEED = 'SAVE_FEED'

export const saveFeed = payload => ({
  type: SAVE_FEED,
  payload,
})
