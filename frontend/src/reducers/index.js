import { combineReducers } from 'redux';
import { propertyList } from './properties';
import propertyDetail from './getPropertyDetail';
import { openAuth } from './ui';

export default combineReducers({
  propertyList,
  propertyDetail,
  openAuth,
});
