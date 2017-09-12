import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import HomePage from './components/HomePage'
import StatusPage from './components/StatusPage.js'
import TeamPage from './components/TeamPage.js'
import ChatPage from './components/ChatPage.js'
import NotFoundPage from './components/NotFoundPage.js'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='teams' component={StatusPage} />
    <Route path='teams/:id' component={TeamPage} />
    <Route path='bandit/chat' component={ChatPage} />
    <Route path='teams/:id/chat' component={ChatPage} />
    <Route path='*' component={NotFoundPage} />
  </Route>
)
