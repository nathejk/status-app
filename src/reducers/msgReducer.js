import R, {append} from 'ramda'
import * as types from '../constants/actionTypes'
import moment from 'moment'

const msgByDesc = R.descend(R.prop('sendAt'))

const initialState = {
  messages: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    // case (types.MSG__NAVIGATE_TO_CHANNEL): {
      // let data = action.data.regions.sort((a, b) => b.scans - a.scans)

      // return objectAssign({}, state, {regions: data})
    // }

    case (types.LOG_OUT): {
      return {}
    }

    case (types.MSG__CONNECTED): {
      return {
        ...state,
        //  usersConnected: append(action.payload, state.usersConnected),
        messages: R.sort(msgByDesc, state.messages)
      }
    }

    case (types.MSG__USER_CONNECTED): {
      return {
        ...state,
        usersConnected: append(action.payload, state.usersConnected)
      }
    }

    case (types.MSG__NEW_MESSAGE_RECEIVED): {
      const message = {...action.payload, createdAt: moment(action.createdAt)}

      return {...state, messages: append(message, state.messages)}
    }

    default:
      return state
  }
}
