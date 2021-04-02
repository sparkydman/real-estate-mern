import {
  LOGIN_REQUEST,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from '../constants/auth';

const login = (state = { user: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return { loading: true };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', `Bearer ${payload.token}`);
      return { loading: false, user: payload };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export default login;
