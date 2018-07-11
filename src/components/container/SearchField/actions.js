import { searchMachine } from './machine'
import { actionMap } from './actionMap'
import { RXState } from '../../../store/middleware/rxstate'

export const UPDATE_SEARCH_VALUE = 'UPDATE_SEARCH_VALUE'

const rXState = new RXState(searchMachine, actionMap)
export const SEARCH_MACHINE = rXState.getActionCreators()

export const updateSearchValue = payload => ({
  type: UPDATE_SEARCH_VALUE,
  payload,
})
