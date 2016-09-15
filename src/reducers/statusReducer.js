import * as types from '../constants/actionTypes'
import initialState from './initialState'
const objectAssign = require('object-assign')

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function statusReducer(state = initialState.data, action) {
  switch (action.type) {
    case (types.SELECT_REGION): {
      return action
    }

    case (types.RECEIVE_POSTS): {
      return objectAssign({}, state, action.data)
    }

    default:
      return state
  }
}