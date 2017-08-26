import { delay } from 'redux-saga'
import { put, call, all, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as actions from '../constants/actionTypes'
import {receivePosts} from '../actions/LoginActions'
import api from '../api'

function * login ({phone}) {
  yield call(delay, 500)

  if (process.env.NODE_ENV !== 'production') {
    yield put(push('/status'))
    yield put(receivePosts(phone, require('./login-mock')))
    return
  }

  try {
    const apiResponse = yield call(api.login, phone)

    yield put(push('/status'))
    yield put(receivePosts(phone, apiResponse))
  } catch (error) {
    yield put({
      type: actions.LOG_IN_FAILED,
      error: error
    })
  }
}

export default function * rootSaga () {
  yield all([
    takeLatest(actions.REQUEST_POSTS, login)
  ])
}
