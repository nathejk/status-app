import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import statusReducer from './statusReducer';

const rootReducer = combineReducers({
  statusReducer,
  routing: routerReducer
});

export default rootReducer;
