import { combineReducers } from 'redux';
import user from './user';
import settings from './settings';
import call from './call';

export default combineReducers({
  user,
  settings,
  call
});
