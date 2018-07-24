import { Functional } from '../../helpers/functional'

export class RXState {
  constructor(machine, actionMap) {
    this.machine = machine
    this.actionMap = actionMap
  }
  static createMiddleware = () => ({
    dispatch,
    getState,
  }) => next => action => {
    if (action.machine && action.actionMap) {
      const machine = action.machine
      const actionMap = action.actionMap
      const state = getState()
      const nextState = machine.transition(
        state[machine.id].state,
        action,
        state,
      )

      dispatch({
        type: `@@${machine.id}/UPDATE_STATE`,
        payload: nextState.value,
      })

      console.log('actionMap', actionMap)

      nextState.actions
        .filter(nextAction => actionMap[nextAction])
        .filter(Boolean)
        .forEach(nextAction => {
          actionMap[nextAction]({
            payload: action.payload,
            type: action.type,
            dispatch,
            state,
            actions: action.actions,
            history: nextState.history,
          })
        })
    }
    next(action)
  }
  findActions = states => {
    const actions = Object.keys(states)
      .map(key => {
        const state = states[key]
        const actions = Object.keys(state.on || {})
        return this.findActions(state.states || {}).concat(actions)
      })
      .reduce((a, b) => a.concat(b), [])
      .filter((key, pos, arr) => arr.indexOf(key) === pos)
    return actions
  }
  createActionCreators = actions => {
    const actionCreators = actions.reduce((actionObject, action) => {
      if (!actionObject[action]) {
        actionObject[action] = payload => ({
          type: action,
          payload,
          machine: this.machine,
          actions: actionObject,
          actionMap: this.actionMap,
        })
      }
      return actionObject
    }, {})
    return actionCreators
  }
  getActionCreators = () => {
    return Functional.pipe(
      this.findActions,
      this.createActionCreators,
    )(this.machine.config.states)
  }
}
