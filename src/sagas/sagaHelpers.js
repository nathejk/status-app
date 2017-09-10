import {AUTHENTICATED} from '../constants/loginStates'

export const getState = state => state

export const getAuthenticatedState = state => state.loginReducer.loginState === AUTHENTICATED
export const getUserState = state => state.loginReducer.user
export const getLastRecievedMessageAt = state => state.msg.lastMessageReceivedAt
