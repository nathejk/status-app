import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './components/App'
import HomePage from './components/HomePage'
import StatusPage from './components/StatusPage.js'
import TeamPage from './components/TeamPage.js'
import NotFoundPage from './components/NotFoundPage.js'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="status" component={StatusPage}/>
    <Route path="team/:id" component={TeamPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
)
