import {
  CREATE_PROPERTY_FAIL,
  CREATE_PROPERTY_REQUEST,
  CREATE_PROPERTY_SUCCESS,
  GET_PROPERRTY_DETAIL_FAIL,
  GET_PROPERRTY_DETAIL_REQUEST,
  GET_PROPERRTY_DETAIL_SUCCESS,
} from '../constants/properties';

const getPropertyDetail = (state = { property: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROPERRTY_DETAIL_REQUEST:
    case CREATE_PROPERTY_REQUEST:
      return { loading: true };
    case GET_PROPERRTY_DETAIL_SUCCESS:
    case CREATE_PROPERTY_SUCCESS:
      return { loading: false, property: payload };
    case GET_PROPERRTY_DETAIL_FAIL:
    case CREATE_PROPERTY_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export default getPropertyDetail;
