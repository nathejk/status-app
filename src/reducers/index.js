import { combineReducers } from 'redux'
import {routerReducer} from 'react-router-redux'
import statusReducer from './statusReducer'
import msgReducer from './msgReducer'
import loginReducer from './loginReducer'

const rootReducer = combineReducers({
  statusReducer,
  loginReducer,
  msg: msgReducer,
  routing: routerReducer
})

export default rootReducer
