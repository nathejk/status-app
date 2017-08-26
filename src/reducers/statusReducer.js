import * as types from '../constants/actionTypes'
import initialState from './initialState'
const objectAssign = require('object-assign')

export default function statusReducer (state = initialState.data, action) {
  switch (action.type) {
    case (types.SELECT_REGION): {
      return action
    }

    case (types.RECEIVE_POSTS): {
      let data = action.data.regions.sort((a, b) => b.scans - a.scans)

      return objectAssign({}, state, {regions: data})
    }

    default:
      return state
  }
}
