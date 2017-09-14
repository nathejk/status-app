// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import { createStore, compose, applyMiddleware } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { createOpbeatMiddleware } from 'opbeat-react/redux'
import rootReducer from '../reducers'
import rootSaga from '../sagas'
import {loadState} from '../localStorage'
const sagaMiddleware = createSagaMiddleware()

export default function configureStore (initialState, browserHistory) {
  const middewares = [
    // Add other middleware on this line...

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),

    // To support dipatch push (route) in actions
    routerMiddleware(browserHistory),
    sagaMiddleware,
    createOpbeatMiddleware()
  ]

  const store = createStore(rootReducer, loadState(), compose(
    applyMiddleware(...middewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
  )
)
  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default // eslint-disable-line global-require
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
