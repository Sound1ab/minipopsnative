import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { RXState } from '../store/middleware/rxstate'
import { search } from '../components/container/SearchField/reducers'
import { signUp } from '../machines/SignUp/reducers'
import { signIn } from '../machines/Login/reducers'
import { app } from '../machines/App/reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    app,
    search,
    signUp,
    signIn,
  }),
  composeEnhancers(applyMiddleware(RXState.createMiddleware())),
)

export default store
