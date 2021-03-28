import { combineReducers } from 'redux';
import { propertyList } from './properties';
import propertyDetail from './getPropertyDetail';
import { openAuth } from './ui';
import login from './login';

export default combineReducers({
  propertyList,
  propertyDetail,
  openAuth,
  login,
});
