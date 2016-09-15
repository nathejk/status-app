import * as types from '../constants/actionTypes'
import {AUTHENTICATED, DEFAULT, ERROR, LOADING} from '../constants/loginStates'
import initialState from './initialState'

const objectAssign = require('object-assign')

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function loginReducer(state = initialState.user, action) {
  switch (action.type) {
    case (types.REQUEST_POSTS): {
      return objectAssign({}, state, {loginState: LOADING})
    }

    case (types.LOG_IN_FAILED): {
      return objectAssign({}, state, {loginState: ERROR})
    }

    case (types.LOG_OUT): {
      return objectAssign({}, state, {loginState: DEFAULT})
    }

    case (types.RECEIVE_POSTS): {
      return objectAssign({}, state, {user: action.phone}, {loginState: AUTHENTICATED})
    }

    default:
      return state
  }
}
