import { combineReducers } from 'redux'
import {routerReducer} from 'react-router-redux'
import statusReducer from './statusReducer'
import loginReducer from './loginReducer'

const rootReducer = combineReducers({
  statusReducer,
  loginReducer,
  routing: routerReducer
})

export default rootReducer
