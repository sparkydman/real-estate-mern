import {
  GET_PROPERRTY_DETAIL_FAIL,
  GET_PROPERRTY_DETAIL_REQUEST,
  GET_PROPERRTY_DETAIL_SUCCESS,
} from '../constants/properties';

export default (state = { property: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROPERRTY_DETAIL_REQUEST:
      return { loading: true };
    case GET_PROPERRTY_DETAIL_SUCCESS:
      return { loading: false, property: payload };
    case GET_PROPERRTY_DETAIL_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};
