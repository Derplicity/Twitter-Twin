import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import trendReducer from './trendReducer';
import statusReducer from './statusReducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  trend: trendReducer,
  status: statusReducer,
});
