import { combineReducers } from 'redux';
import { propertyList } from './properties';
import propertyDetail from './getPropertyDetail';

export default combineReducers({
  propertyList,
  propertyDetail,
});
