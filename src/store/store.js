import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { RXState } from '../store/middleware/rxstate'
import { search } from '../components/container/SearchField/reducers'
import { signUp } from '../components/container/SignUp/reducers'
import { signIn } from '../components/container/SignIn/reducers'
import { app } from '../components/container/App/reducers'

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
