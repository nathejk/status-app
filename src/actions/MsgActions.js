import {MSG__USER_CONNECTED, MSG__NEW_MESSAGE_RECEIVED_BULK, MSG__CONNECTED, MSG__DISCONNECTED, MSG__NAVIGATE_TO_CHANNEL, MSG__SEND_MESSAGE, MSG__NEW_MESSAGE_RECEIVED} from '../constants/actionTypes'

export const connected = () => ({
  type: MSG__CONNECTED
})

export const disconnected = () => ({
  type: MSG__DISCONNECTED
})

export const userConnected = (user) => ({
  type: MSG__USER_CONNECTED,
  payload: user
})

export const openChat = (channel) => ({
  type: MSG__NAVIGATE_TO_CHANNEL,
  payload: channel || 'Nathejk'
})

export const messageRecieved = (message) => ({
  type: MSG__NEW_MESSAGE_RECEIVED,
  payload: message
})

export const multipleMessagesRecieved = (messages) => ({
  type: MSG__NEW_MESSAGE_RECEIVED_BULK,
  payload: messages
})

export const sendMessage = (message, channel) => ({
  type: MSG__SEND_MESSAGE,
  payload: {message, channel: channel || 'Nathejk'}
})
