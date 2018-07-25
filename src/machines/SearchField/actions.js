// @flow
import { searchMachine } from './machine'
import { actionMap } from './actionMap'
import { RXState } from '../../store/middleware/rxstate'

export const UPDATE_SEARCH_VALUE = 'UPDATE_SEARCH_VALUE'
export const UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS'
export const UPDATE_DISCOVERY_RESULTS = 'UPDATE_DISCOVERY_RESULTS'

const rXState = new RXState(searchMachine, actionMap)
export const SEARCH_MACHINE = rXState.getActionCreators()

export const updateSearchValue = (payload: string) => ({
  type: UPDATE_SEARCH_VALUE,
  payload,
})

export const updateSearchResults = (payload: Array<Object>) => ({
  type: UPDATE_SEARCH_RESULTS,
  payload,
})

export const updateDiscoveryResults = (payload: Array<Object>) => ({
  type: UPDATE_DISCOVERY_RESULTS,
  payload,
})
