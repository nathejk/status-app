import {createStore, compose, applyMiddleware} from 'redux'
import rootReducer from '../reducers'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { createOpbeatMiddleware } from 'opbeat-react/redux'
import rootSaga from '../sagas'
import {loadState} from '../localStorage'
const sagaMiddleware = createSagaMiddleware()

export default function configureStore (initialState, browserHistory) {
  const middewares = [
    routerMiddleware(browserHistory),

    sagaMiddleware,
    createOpbeatMiddleware()
  ]

  const store = createStore(rootReducer, loadState(), compose(
    applyMiddleware(...middewares)
    )
  )

  sagaMiddleware.run(rootSaga)
  return store
}
