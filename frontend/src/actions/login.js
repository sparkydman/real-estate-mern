import axios from 'axios';
import getMe from './getMe';
import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS } from '../constants/auth';

const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post('/api/v1/user/login', userData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    dispatch(getMe());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response ? err.response.data.error.message : err.message,
    });
  }
};
export default login;
