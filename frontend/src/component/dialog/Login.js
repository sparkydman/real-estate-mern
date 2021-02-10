import React from 'react';
import './Login.scss';

const Login = () => {
  return (
    <form className="login__form">
      <div className="form__control_login">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Enter email..."
        />
      </div>
      <div className="form__control_login">
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          placeholder="Enter password..."
        />
      </div>
      <div className="form__control_login">
        <button type="submit" className="submit__btn">
          Login
        </button>
      </div>
      <p className="form__footer_link">
        Don&apos;t have account?{' '}
        <span className="form__register_link">Register</span>
      </p>
    </form>
  );
};

export default Login;
