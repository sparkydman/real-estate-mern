import axios from '../http';
import {
  REGISTER_REQUEST,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../constants/auth';

const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const { data } = await axios.post('/user/register', userData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response ? err.response.data.error : err.message,
    });
  }
};
export default register;
