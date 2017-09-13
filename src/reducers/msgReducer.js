import R, {append} from 'ramda'
import * as types from '../constants/actionTypes'
import moment from 'moment'

const msgByDesc = (a, b) => {
  return a.createdAt - b.createdAt
}

const filterByChannel = (allMessages, channel) => {
  return allMessages.filter(x => x.channel === channel, allMessages).map(m => {
    return {...m, createdAt: m.createdAt.fromNow === 'function' ? m.createdAt : moment(m.createdAt)}
  })
}

const initialState = {
  messages: [],
  allMessages: [],
  channelMessages: [],
  channel: 'Nathejk'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ('@@INIT'): {
      console.log([`init `, state])

      if (!state.allMessages) {
        return {...initialState}
      }

      const messages = state.allMessages.map(m => {
        return {...m, createdAt: moment(m.createdAt)}
      })
      return {...state, messages}
    }

    case (types.LOG_OUT): {
      return initialState
    }

    case ('@@router/LOCATION_CHANGE'): {
      console.log('LOCATION_CHANGE')
      console.log(action.payload.pathname)
      const currentChannel = state.channel
      const pathname = action.payload.pathname

      if (pathname === '/bandit/chat' && currentChannel !== 'Nathejk') {
        const channel = 'Nathejk'
        return {
          ...state,
          channel: channel,
          channelMessages: R.sort(msgByDesc, filterByChannel(state.allMessages, channel))
        }
      }

      if (R.startsWith('/teams/', pathname) && R.endsWith('/chat')) {
        const channel = pathname.substring(7, pathname.length - 5)
        return {
          ...state,
          channel: channel,
          channelMessages: R.sort(msgByDesc, filterByChannel(state.allMessages, channel))
        }
      }

      return state
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

    case (types.MSG__NAVIGATE_TO_CHANNEL): {
      return {
        ...state,
        channel: action.payload.channel,
        channelMessages: R.sort(msgByDesc, filterByChannel(state.allMessages, action.payload.channel))
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
      const allMessages = append(message, state.allMessages)
      const channelMessages = R.sort(msgByDesc, filterByChannel(allMessages, state.channel))
      return {...state, channelMessages, allMessages, lastMessageReceivedAt: R.last(allMessages).createdAt}
    }

    case (types.MSG__NEW_MESSAGE_RECEIVED_BULK): {
      const newMessages = action.payload.map(m => {
        return {...m, createdAt: moment(m.createdAt)}
      })

      const allMessages = R.insertAll(state.allMessages.length - 1, state.allMessages, newMessages)
      const channelMessages = R.sort(msgByDesc, filterByChannel(allMessages, state.channel))
      return {...state, channelMessages, allMessages, lastMessageReceivedAt: R.last(allMessages).createdAt}
    }

    default:
      return state
  }
}
