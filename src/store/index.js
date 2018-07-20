import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { RXState } from '../store/middleware/rxstate'
import { search } from '../components/container/SearchField/reducers'
import { signUp } from '../components/container/SignUp/reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    search,
    signUp,
  }),
  composeEnhancers(applyMiddleware(RXState.createMiddleware())),
)

export default store
