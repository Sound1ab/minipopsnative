import { RXState } from '../../store/middleware/rxstatev2'
import { reactions } from './reactions'
import { machine } from './machine'

export const discoveryMachine = new RXState(machine, reactions, true)
export * from './actions'
export * from './selectors'
