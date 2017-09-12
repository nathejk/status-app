import R, {append} from 'ramda'
import * as types from '../constants/actionTypes'
import moment from 'moment'

const msgByDesc = (a, b) => {
  return a.createdAt - b.createdAt
}

const initialState = {
  messages: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ('@@INIT'): {
      console.log([`init `, state])

      if (!state.messages) {
        return {...initialState}
      }

      const messages = state.messages.map(m => {
        return {...m, createdAt: moment(m.createdAt)}
      })
      return {...state, messages}
    }

    case (types.LOG_OUT): {
      return {}
    }

    case (types.MSG__CONNECTED): {
      console.log([state.lastMessageReceivedAt, state.messages])
      return {
        ...state,
        connected: true
      }
    }

    case (types.MSG__DISCONNECTED): {
      return {
        ...state,
        connected: false
      }
    }

    case (types.MSG__USER_CONNECTED): {
      return {
        ...state,
        usersConnected: append(action.payload, state.usersConnected)
      }
    }

    case (types.MSG__NEW_MESSAGE_RECEIVED): {
      const message = {...action.payload, createdAt: moment(action.payload.createdAt)}
      const messages = R.sort(msgByDesc, append(message, state.messages))

      return {...state, messages, lastMessageReceivedAt: R.last(messages).createdAt}
    }

    case (types.MSG__NEW_MESSAGE_RECEIVED_BULK): {
      const newMessages = action.payload.map(m => {
        return {...m, createdAt: moment(action.payload.createdAt)}
      })
      const messages = R.sort(msgByDesc, R.insertAll(state.messages.length - 1, state.messages, newMessages))
      console.log(['bulk', messages])
      return {...state, messages, lastMessageReceivedAt: R.last(messages).createdAt}
    }

    default:
      return state
  }
}
