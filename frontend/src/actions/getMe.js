import axios from 'axios';
import { GET_ME_REQUEST, GET_ME_FAIL, GET_ME_SUCCESS } from '../constants/auth';
import setAuthToken from '../component/util/setAuthToken';

const getMe = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    dispatch({ type: GET_ME_REQUEST });

    const { data } = await axios.get('/user/profile');
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
export default getMe;
