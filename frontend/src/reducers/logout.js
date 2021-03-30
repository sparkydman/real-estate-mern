import { LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../constants/auth';

const logout = (state = { status: false }, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return { loading: true };
    case LOGOUT_SUCCESS:
      return { loading: false, status: true };
    case LOGOUT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default logout;
