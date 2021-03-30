import React, { useState, useEffect } from 'react';
import './Login.scss';
import { useDispatch, useSelector } from 'react-redux';
import loginUser from '../../actions/login';
import { CLOSE_BOTTOM_NAV, OPEN_BOTTOM_NAV } from '../../constants/ui';

const initialState = {
  email: '',
  password: '',
};
const Login = () => {
  const [value, setValue] = useState(initialState);
  const dispatch = useDispatch();

  const login = useSelector((state) => state.login);
  const { loading, error, user } = login;

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(value));
  };
  useEffect(() => {
    if (!loading && user?.success) {
      localStorage.setItem('token', `Bearer ${user.token}`);
      dispatch({ type: CLOSE_BOTTOM_NAV });
    }
  }, [user, loading, dispatch]);

  return (
    <form className="login__form" onSubmit={onSubmit}>
      <div className="form__control_login">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={value.email}
          placeholder="Enter email..."
          onChange={onChange}
        />
      </div>
      <div className="form__control_login">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={value.password}
          placeholder="Enter password..."
          onChange={onChange}
        />
      </div>
      {error && <small>{error}</small>}
      <div className="form__control_login">
        <button type="submit" className="submit__btn" disabled={loading}>
          {loading ? <img src="/loader.gif" alt="loading..." /> : 'Login'}
        </button>
      </div>
      <p className="form__footer_link">
        Don&apos;t have account?{' '}
        <span
          className="form__register_link"
          onClick={() =>
            dispatch({
              type: OPEN_BOTTOM_NAV,
              payload: {
                elmt: 'register',
                title: 'Register',
                icon: 'lock',
              },
            })
          }
        >
          Register
        </span>
      </p>
    </form>
  );
};

export default Login;
