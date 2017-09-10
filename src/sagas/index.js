import { delay } from 'redux-saga'
import { put, call, all, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as actions from '../constants/actionTypes'
import {AUTHENTICATED} from '../constants/loginStates'
import {receivePosts} from '../actions/LoginActions'
import api from '../api'
import {saveState} from '../localStorage'
import msgSagas from './msg'
import {getState} from './sagaHelpers'

const findUser = (apiResponse, phone) => {
  let region, team, user
  for (let i = 0; i < apiResponse.regions.length; i++) {
    region = apiResponse.regions[i]
    user = findUserInMembers(region.members, phone)
    if (user) {
      return user
    }

    for (let z = 0; z < region.teams.length; z++) {
      team = region.teams[z]
      user = findUserInMembers(team.members, phone)
      if (user) {
        return user
      }
    }
  }
}

const findUserInMembers = (members, phone) => {
  let member
  for (let z = 0; z < members.length; z++) {
    member = members[z]
    if (member.phone === phone) {
      return member
    }
  }
}

function * login ({phone}) {
  yield call(delay, 500)
  if (process.env.NODE_ENV !== 'production') {
    yield put(push('/status'))
    const data = require('./login-mock').default
    const user = findUser(data, phone)
    yield put(receivePosts(user, data))
    return
  }

  try {
    const apiResponse = yield call(api.login, phone)

    yield put(push('/status'))
    const user = findUser(apiResponse, phone)
    yield put(receivePosts(user, apiResponse))
  } catch (error) {
    yield put({
      type: actions.LOG_IN_FAILED,
      error: error
    })
  }
}

function * ensureRoute ({payload: {pathname}}) {
  yield call(delay, 50)
  const state = yield select(getState)
  if (state.loginReducer.loginState === AUTHENTICATED && pathname === '/') {
    yield put(push('/status'))
  } else if (state.loginReducer.loginState !== AUTHENTICATED && pathname !== '/') {
    yield put(push('/'))
  }
}

function * saveStateOnUpdates ({phone}) {
  yield call(delay, 100)
  const state = yield select(getState)
  if (state.loginReducer.loginState === AUTHENTICATED) {
    saveState({...state, routing: undefined, msg: undefined})
  } else {
    saveState({})
  }
}

export default function * rootSaga () {
  yield all([
    ...msgSagas(),
    takeEvery('*', saveStateOnUpdates),
    takeLatest(actions.REQUEST_POSTS, login),
    takeLatest('@@router/LOCATION_CHANGE', ensureRoute)
  ])
}
