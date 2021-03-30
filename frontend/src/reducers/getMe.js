import { GET_ME_REQUEST, GET_ME_SUCCESS, GET_ME_FAIL } from '../constants/auth';

const getMe = (state = { me: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ME_REQUEST:
      return { loading: true };
    case GET_ME_SUCCESS:
      return { loading: false, me: payload };
    case GET_ME_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export default getMe;
