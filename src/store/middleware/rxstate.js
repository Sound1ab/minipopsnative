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

      const composedActions = RXState.composeActionsWithDispatch(
        dispatch,
        action.actions,
      )

      nextState.actions
        .filter(nextAction => actionMap[nextAction])
        .filter(Boolean)
        .forEach(nextAction => {
          actionMap[nextAction]({
            payload: action.payload,
            type: action.type,
            dispatch,
            state,
            actions: composedActions,
            history: nextState.history,
          })
        })
    }
    next(action)
  }

  static composeActionsWithDispatch = (dispatch, actions) =>
    Object.entries(actions).reduce((composedActions, v) => {
      const [actionKey, actionFunction] = v
      if (!composedActions[actionKey]) {
        composedActions[actionKey] = Functional.compose(
          dispatch,
          actionFunction,
        )
      }
      return composedActions
    }, {})

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

  getActionCreators = () =>
    Functional.pipe(
      this.findActions,
      this.createActionCreators,
    )(this.machine.config.states)
}
