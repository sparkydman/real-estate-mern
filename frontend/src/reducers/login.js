import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from '../constants/auth';

const login = (state = { user: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return { loading: true };
    case LOGIN_SUCCESS:
      return { loading: false, user: payload };
    case LOGIN_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export default login;
