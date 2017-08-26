import {createStore, compose, applyMiddleware} from 'redux'
import rootReducer from '../reducers'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()

export default function configureStore (initialState, browserHistory) {
  const middewares = [
    routerMiddleware(browserHistory),

    sagaMiddleware
  ]

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middewares)
    )
  )

  sagaMiddleware.run(rootSaga)
  return store
}
