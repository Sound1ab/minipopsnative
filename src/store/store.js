import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { RXState } from '../store/middleware/rxstate'
import { signUp } from '../machines/SignUp/reducers'
import { login } from '../machines/Login/reducers'
import { app } from '../machines/App/reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    app,
    signUp,
    login,
  }),
  composeEnhancers(applyMiddleware(RXState.createMiddleware())),
)

export default store
