import { delay, eventChannel } from 'redux-saga'
import { put, take, fork, call, takeLatest, takeEvery, select } from 'redux-saga/effects'
import io from 'socket.io-client'
// import { push } from 'react-router-redux'
import { push } from 'react-router-redux'
import {getAuthenticatedState, getUserState, getLastRecievedMessageAt} from './sagaHelpers'
import * as actions from '../actions/MsgActions'
import * as actionTypes from '../constants/actionTypes'

export const MSG_API__JOIN_CHANNEL = 'join channel'
export const MSG_API__CHANGE_CHANNEL = 'MSG_API__CHANGE_CHANNEL'
export const MSG_API__GET_MESSAGES_FROM = 'MSG_API__GET_MESSAGES_FROM'
export const MSG_API__LEAVE_CHANNEL = 'leave channel'
export const MSG_API__NEW_MESSAGE = 'new message'
export const MSG_API__NEW_MESSAGE_BULK = 'MSG_API__NEW_MESSAGE_BULK'

function createSocketChannel (socket) {
  return eventChannel(emit => {
    socket.on('connect', () => {
      emit(actions.connected())
    })

    socket.on('disconnect', () => {
      emit(actions.disconnected())
    })

    socket.on('user connected', (user) => {
    })

    socket.on('connect_error', (err) => {
      console.log(err)
    })

    socket.on('connect_timeout', (timeout) => {
      console.log(timeout)
    })

    socket.on('error', (error) => {
      console.log(error)
    })

    socket.on('disconnect', (reason) => {
      console.log(reason)
    })

    socket.on(MSG_API__NEW_MESSAGE, (message) => {
      console.log(message)
      emit(actions.messageRecieved(message))
      const elements = document.getElementsByClassName('text')
      if (elements && elements.length > 1) {
        elements[elements.length - 1].scrollIntoView()
      }
    })

    socket.on(MSG_API__NEW_MESSAGE_BULK, (messages) => {
      emit(actions.multipleMessagesRecieved(messages))
      const elements = document.getElementsByClassName('text')
      if (elements && elements.length > 1) {
        elements[elements.length - 1].scrollIntoView()
      }
    })
    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
    }

    return unsubscribe
  })
}
let socket

function * sendMessage ({payload: {channel, message}}) {
  const user = yield select(getUserState)
  socket.emit(MSG_API__NEW_MESSAGE, {channel, message, user})
}

function * checkServerForNewMessages () {
  const fromDate = yield select(getLastRecievedMessageAt)
  socket.emit(MSG_API__GET_MESSAGES_FROM, {channel: 'nathejk', fromDate: fromDate || new Date('2013-10-01T00:00:00.000Z')})
}

function * joinChannel ({payload: {channel, id}}) {
  yield put(push(`/teams/${channel}/chat`))
}

process.env.CHAT_SERVER_URL = '//'
process.env.CHAT_SERVER_PORT = '3002'

function * connectToChatServer () {
  const authenticated = yield select(getAuthenticatedState)
  const user = yield select(getUserState)
  if (authenticated && !socket) {
    socket = io(`${process.env.CHAT_SERVER_URL}:${process.env.CHAT_SERVER_PORT}?phone=${user.phone}`)
    const socketChannel = yield call(createSocketChannel, socket)
    console.log(socketChannel)

    while (true) {
      const payload = yield take(socketChannel)
      console.log(payload)
      yield put(payload)
    }
  }
}

function * ensureRoute (action) {
  yield delay(1000)

  yield fork(connectToChatServer)
}

export default function rootSaga () {
  return [
    takeEvery(actionTypes.MSG__SEND_MESSAGE, sendMessage),
    takeEvery(actionTypes.MSG__CONNECTED, checkServerForNewMessages),
    takeEvery(actionTypes.MSG__NAVIGATE_TO_CHANNEL, joinChannel),
    fork(connectToChatServer),

    takeLatest(actionTypes.RECEIVE_POSTS, ensureRoute),
    takeLatest('@@router/LOCATION_CHANGE', ensureRoute)
  ]
}
