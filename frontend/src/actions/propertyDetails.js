import axios from 'axios';
import {
  GET_PROPERRTY_DETAIL_FAIL,
  GET_PROPERRTY_DETAIL_REQUEST,
  GET_PROPERRTY_DETAIL_SUCCESS,
} from '../constants/properties';

const propertyDetail = (propertyId) => async (dispatch) => {
  try {
    dispatch({ type: GET_PROPERRTY_DETAIL_REQUEST });

    const { data } = await axios.get(`/api/v1/property/${propertyId}`);
    dispatch({
      type: GET_PROPERRTY_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROPERRTY_DETAIL_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error.message
          : err.message,
    });
  }
};
export default propertyDetail;
