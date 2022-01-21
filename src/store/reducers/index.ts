import { combineReducers } from 'redux';
import user from './user';
import sidebar from './sidebar';

export default combineReducers({
  user,
  sidebar,
});
