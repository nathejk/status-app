/* eslint-disable import/default */

import initOpbeat, { wrapRouter } from 'opbeat-react'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import configureStore from './store/configureStore'
import './styles/styles.scss' // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import { syncHistoryWithStore } from 'react-router-redux'

import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

require('./favicon.ico') // Tell webpack to load favicon.ico

const OpbeatRouter = wrapRouter(Router)

initOpbeat({
  orgId: '5e39308c355149cb9fc5280d31ede681',
  appId: '937f9796e3'
})

const store = configureStore(undefined, browserHistory)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div className='wrapper'>
        <OpbeatRouter history={history} routes={routes} />
      </div>
    </MuiThemeProvider>
  </Provider>, document.getElementById('app')
)
