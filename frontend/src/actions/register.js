import axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../constants/auth';
import getMe from './getMe';

const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const { data } = await axios.post('/api/v1/user/register', userData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
    dispatch(getMe());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response ? err.response.data.error : err.message,
    });
  }
};
export default register;
