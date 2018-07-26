// @flow
import { machine } from './machine'
import { actionMap } from './actionMap'
import { RXState } from '../../store/middleware/rxstate'

const rXState = new RXState(machine, actionMap)
export const FAVOURITES_MACHINE_ACTIONS = rXState.getActionCreators()

export const SAVE_ARTIST_RELEASES = 'SAVE_ARTIST_RELEASES'

export const saveArtistReleases = payload => ({
  type: SAVE_ARTIST_RELEASES,
  payload,
})
