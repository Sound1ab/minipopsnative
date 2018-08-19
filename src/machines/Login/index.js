import { RXState } from '../../store/middleware/rxstatev2'
import { reactions } from './reactions'
import { machine } from './machine'

export const loginMachine = new RXState(machine, reactions)
export * from './actions'
