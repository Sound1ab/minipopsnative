import { RXState } from '../../store/middleware/rxstatev2'
import { reactions } from './reactions'
import { machine } from './machine'

export const searchMachine = new RXState(machine, reactions)
export * from './actions'
export * from './machine'
export * from './reactions'
