import moment from 'moment'
import * as types from '../constants/actionTypes'
import initialState from './initialState'

export default function statusReducer (state = initialState.data, action) {
  switch (action.type) {
    case (types.SELECT_REGION): {
      return action
    }

    case (types.RECEIVE_POSTS): {
      let data = action.data.regions.sort((a, b) => b.scans - a.scans)

      return {...state, regions: data, lastUpdatedAt: moment()}
    }

    case (types.LOG_OUT): {
      return initialState
    }

    default:
      return state
  }
}
