import R, {append} from 'ramda'
import * as types from '../constants/actionTypes'
import moment from 'moment'

const msgByDesc = R.descend(R.prop('sendAt'))

const initialState = {
  messages: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case (types.LOG_OUT): {
      return {}
    }

    case (types.MSG__CONNECTED): {
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

    default:
      return state
  }
}
