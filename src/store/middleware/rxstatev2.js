import { Functional } from '../../helpers/functional'
import store from '../store'

export class RXState {
  constructor(machine, reactions, debug = false) {
    this.machine = machine
    this.reactions = reactions
    this.state = machine.initialState.value
    this.actions = this.getActions()
    this.debug = debug
  }

  dispatchAction = (action, payload) => {
    if (this.actions[action]) {
      this.actions[action](payload)
    } else {
      console.warn(
        `action (${JSON.stringify(
          action,
        )}) does not exist in actions: ${JSON.stringify(this.actions)}`,
      )
    }
  }

  actionHandler = action => {
    this.debug && console.warn('action', action.type)
    const nextState = this.machine.transition(this.state, action.type)

    this.state = nextState
    if (store) {
      store.dispatch({
        type: `@@${this.machine.id}/UPDATE_STATE`,
        payload: this.state.value,
      })
    }
    this.debug && console.warn('nextStateValue', nextState.value)
    this.debug && console.warn('nextReactions', nextState.actions)

    nextState.actions
      .filter(nextAction => this.reactions[nextAction])
      .filter(Boolean)
      .forEach(nextAction => {
        this.reactions[nextAction]({
          payload: action.payload,
          type: action.type,
          history: nextState.history,
          dispatchMachineAction: this.dispatchAction,
          dispatchReduxAction: store ? store.dispatch : null,
          reduxState: store ? store.getState() : null,
        })
      })
  }

  findActions = states =>
    Object.keys(states)
      .map(key => {
        const state = states[key]
        const actions = Object.keys(state.on || {})
        return this.findActions(state.states || {}).concat(actions)
      })
      .reduce((a, b) => a.concat(b), [])
      .filter((key, pos, arr) => arr.indexOf(key) === pos)

  createActionCreators = actions =>
    actions.reduce((actionObject, action) => {
      if (!actionObject[action]) {
        actionObject[action] = payload =>
          this.actionHandler({
            type: action,
            payload,
            actionObject,
          })
      }
      return actionObject
    }, {})

  getActions = () =>
    Functional.pipe(
      this.findActions,
      this.createActionCreators,
    )(this.machine.config.states)
}