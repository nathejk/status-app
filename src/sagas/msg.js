import { delay, eventChannel } from 'redux-saga'
import { put, take, fork, call, takeEvery, select } from 'redux-saga/effects'
import io from 'socket.io-client'
// import { push } from 'react-router-redux'
import {getAuthenticatedState, getUserState} from './sagaHelpers'
import * as actions from '../actions/MsgActions'
import * as actionTypes from '../constants/actionTypes'

export const MSG_API__JOIN_CHANNEL = 'join channel'
export const MSG_API__LEAVE_CHANNEL = 'leave channel'
export const MSG_API__NEW_MESSAGE = 'new message'
// export const MSG_API__ = 'leave channel'

// function * socketFowarder ({type: socketCommandChannel, payload}) {
//   socket.emit(socketCommandChannel, payload)
// }

// function * startChat ({type: socketCommandChannel, payload}) {
//   yield put(push('/status/chat/'))
// }

// function* joinChannel({payload: channel}) {
//   socket.emit(MSG_API__JOIN_CHANNEL, channel)
// }

// function* joinChannel({payload: channel}) {
//   socket.emit(MSG_API__JOIN_CHANNEL, channel)
// }

function createSocketChannel (socket) {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel(emit => {
    // const pingHandler = (event) => {
    //   console.log(event)
    //   if (!event) {
    //     return
    //   }
    //   // puts event payload into the channel
    //   // this allows a Saga to take this payload from the returned channel
    //   emit(event)
    // }

    // setup the subscription
    // socket.on('ping', pingHandler)
    socket.on('user connected', (user) => {
      // console.log(user)
      // emit(actions.userConnected(user))
    })
    socket.on(MSG_API__NEW_MESSAGE, (message) => {
      console.log(message)
      emit(actions.messageRecieved(message))
      const elements = document.getElementsByClassName('text')
      if (elements && elements.length > 1) {
        elements[elements.length - 1].scrollIntoView()
      }
    })
    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      // socket.off('ping', pingHandler)
    }

    return unsubscribe
  })
}
let socket

function * sendMessage ({payload: {channel, message}}) {
  const user = yield select(getUserState)
  socket.emit(MSG_API__NEW_MESSAGE, {channel, message, user})
}

process.env.CHAT_SERVER_URL = 'http://10.0.0.121'
process.env.CHAT_SERVER_PORT = '3002'

function * ensureRoute2 (action) {
  yield delay(10000)
  const authenticated = yield select(getAuthenticatedState)
  const user = yield select(getUserState)
  if (authenticated && !socket) {
    console.log(io)
    socket = io(`${process.env.CHAT_SERVER_URL}:${process.env.CHAT_SERVER_PORT}?phone=${user.phone}`)
    socket.on('connect', () => {
      console.log(socket.id)
    })

    const socketChannel = yield call(createSocketChannel, socket)
    console.log(socketChannel)

    while (true) {
      const payload = yield take(socketChannel)
      console.log(payload)
      yield put(payload)
    }

    // const ios = io.Socket.connect(`http://localhost:3002`)
  } else {
    yield take(actions.RECEIVE_POSTS, ensureRoute2)
  }
}

export default function rootSaga () {
  console.log(`msg`)
  return [
    // ensureRoute2
    // takeEvery([MSG_API__JOIN_CHANNEL, MSG_API__LEAVE_CHANNEL], socketFowarder),
    takeEvery(actionTypes.MSG__SEND_MESSAGE, sendMessage),
    // takeEvery(MSG__JOIN_CHANNEL, joinChannel),
    // takeEvery(MSG__LEAVE_CHANNEL, leaveChannel),
    // takeEvery('*', ensureRoute2)
    fork(ensureRoute2)

    // takeEvery('*', saveStateOnUpdates),
    // takeLatest(actions.REQUEST_POSTS, ensureRoute2)
    // takeLatest('@@router/LOCATION_CHANGE', ensureRoute2)
  ]
}
