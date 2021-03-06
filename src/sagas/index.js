import { delay } from 'redux-saga'
import { put, fork, call, all, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import moment from 'moment'
import * as actions from '../constants/actionTypes'
import {AUTHENTICATED} from '../constants/loginStates'
import {receivePosts} from '../actions/LoginActions'
import api from '../api'
import {saveState} from '../localStorage'
import msgSagas from './msg'
import {getState, getUserState} from './sagaHelpers'

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

function * refetch () {
  while (true) {
    try {
      const state = yield select(getState)
      if (state.loginReducer.loginState === AUTHENTICATED && (!state.loginReducer.lastUpdatedAt || state.loginReducer.lastUpdatedAt < moment().subtract(5, 'seconds'))) {
        const user = yield select(getUserState)
        let apiResponse = yield call(api.login, user.phone)
        apiResponse = JSON.parse(JSON.stringify(apiResponse))
        yield put(receivePosts(user, apiResponse))
      }
    } catch (error) {
      console.log(error)
    }
    yield call(delay, 10000)
  }
}

function * login ({phone}) {
  yield call(delay, 200)
  // if (process.env.NODE_ENV !== 'production') {
  //   yield put(push('/teams'))
  //   const data = require('./login-mock').default
  //   const user = findUser(data, phone)
  //   yield put(receivePosts(user, data))
  //   return
  // }

  try {
    let apiResponse = yield call(api.login, phone)
    apiResponse = JSON.parse(JSON.stringify(apiResponse))
    yield put(push('/teams'))
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
    yield put(push('/teams'))
  } else if (state.loginReducer.loginState !== AUTHENTICATED && pathname !== '/') {
    yield put(push('/'))
  }
}

function * saveStateOnUpdates ({phone}) {
  yield call(delay, 100)
  const state = yield select(getState)
  if (state.loginReducer.loginState === AUTHENTICATED) {
    const statusReducer = {...state.statusReducer, lastUpdatedAt: undefined}
    saveState({...state, routing: undefined, statusReducer})
  } else {
    saveState({})
  }
}

export default function * rootSaga () {
  yield all([
    ...msgSagas(),
    fork(refetch),
    takeEvery('*', saveStateOnUpdates),
    takeLatest(actions.REQUEST_POSTS, login),
    takeLatest('@@router/LOCATION_CHANGE', ensureRoute)
  ])
}
