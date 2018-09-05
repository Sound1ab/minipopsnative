import { machine } from './machine'
import { reactions } from './reactions'
import { RXState } from '../../store/middleware/rxstatev2'

export const compareMachine = new RXState(machine, reactions)
export * from './actions'
export * from './selectors'
