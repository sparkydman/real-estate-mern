import { combineReducers } from 'redux';
import { propertyList } from './properties';
import propertyDetail from './getPropertyDetail';
import ui from './ui';
import login from './login';
import logout from './logout';
import me from './getMe';

export default combineReducers({
  propertyList,
  propertyDetail,
  ui,
  login,
  me,
  logout,
});
