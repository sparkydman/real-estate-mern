import axios from '../http';
import {
  LOGOUT_REQUEST,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  GET_ME_SUCCESS,
} from '../constants/auth';

const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });

    const { data } = await axios.get('/user/logout');
    localStorage.removeItem('token');
    if (data.success) {
      dispatch({
        type: GET_ME_SUCCESS,
        payload: {},
      });
    }
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: err.response ? err.response.data.error.message : err.message,
    });
  }
};
export default logout;
