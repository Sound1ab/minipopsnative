import { RXState } from '../../store/middleware/rxstatev2'
import { reactions } from './reactions'
import { machine } from './machine'

export const appMachine = new RXState(machine, reactions)
export * from './reactions'
