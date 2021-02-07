import axios from '../http';
import {
  GET_ALL_PROPERTIES_REQUEST,
  GET_ALL_PROPERTIES_SUCCESS,
  GET_ALL_PROPERTIES_FAIL,
} from '../constants/properties';

export const getAllProperties = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PROPERTIES_REQUEST });

    const { data } = await axios.get('/property');
    dispatch({
      type: GET_ALL_PROPERTIES_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_PROPERTIES_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error.message
          : err.message,
    });
  }
};
