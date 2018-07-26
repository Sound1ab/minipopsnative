import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { RXState } from '../store/middleware/rxstate'
import { search } from '../machines/SearchField/reducers'
import { signUp } from '../machines/SignUp/reducers'
import { login } from '../machines/Login/reducers'
import { favourites } from '../machines/Favourites/reducers'
import { app } from '../machines/App/reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    app,
    search,
    signUp,
    login,
    favourites,
  }),
  composeEnhancers(applyMiddleware(RXState.createMiddleware())),
)

export default store