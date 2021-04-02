import axios from 'axios';
import {
  CREATE_PROPERTY_REQUEST,
  CREATE_PROPERTY_FAIL,
  CREATE_PROPERTY_SUCCESS,
} from '../constants/auth';

const createProperty = (property) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PROPERTY_REQUEST });

    const { data } = await axios.post('/property', property);
    dispatch({
      type: CREATE_PROPERTY_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_PROPERTY_FAIL,
      payload: err.response ? err.response.data.error : err.message,
    });
  }
};
export default createProperty;
