import axios from '../http';
import { GET_ME_REQUEST, GET_ME_FAIL, GET_ME_SUCCESS } from '../constants/auth';

const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ME_REQUEST });

    const { data } = await axios.get('/user/profile', userData);
    dispatch({
      type: GET_ME_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_ME_FAIL,
      payload: err.response ? err.response.data.error.message : err.message,
    });
  }
};
export default login;
