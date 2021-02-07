/* eslint-disable no-unused-vars */
import {
  GET_ALL_PROPERTIES_REQUEST,
  GET_ALL_PROPERTIES_SUCCESS,
  GET_ALL_PROPERTIES_FAIL,
} from '../constants/properties';

export const propertyList = (state = { properties: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_PROPERTIES_REQUEST:
      return { loading: true };
    case GET_ALL_PROPERTIES_SUCCESS:
      return { loading: false, properties: payload };
    case GET_ALL_PROPERTIES_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
