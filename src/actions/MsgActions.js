import {MSG__USER_CONNECTED, MSG__NAVIGATE_TO_CHANNEL, MSG__SEND_MESSAGE} from '../constants/actionTypes'

export const userConnected = (user) => ({
  type: MSG__USER_CONNECTED,
  payload: user
})

export const openChat = (channel) => ({
  type: MSG__NAVIGATE_TO_CHANNEL,
  payload: channel || 'Nathejk'
})

export const messageRecieved = (message) => ({
  type: MSG__SEND_MESSAGE,
  payload: message
})
