import React from 'react';
import { useDispatch } from 'react-redux';
import { OPEN_BOTTOM_NAV } from '../../constants/ui';
import Avatar from '../util/Avatar';
import './Login.scss';

const Register = () => {
  const dispatch = useDispatch();

  const uploadStyle = { backgroundColor: '#454a4d', color: '#fff' };

  return (
    <form className="login__form">
      <div className="form__control_login">
        <label htmlFor="firstname">First name</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="Enter firstname..."
        />
      </div>
      <div className="form__control_login">
        <label htmlFor="lastname">Last name</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Enter lastname..."
        />
      </div>
      <div className="form__control_login">
        <label htmlFor="phone">Phone number</label>
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="ex: +2348123456789"
        />
      </div>
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
        <label htmlFor="role">Account Type</label>
        <select name="role" id="role">
          <option defaultValue="">Select Type</option>
          <option value="customer">Customer</option>
          <option value="agent">Agent</option>
        </select>
      </div>

      <div className="form__control_login">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password..."
        />
      </div>
      <div className="form__control_login">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm password..."
        />
      </div>
      <div className="form__control_login">
        <label htmlFor="bio">About you</label>
        <textarea
          name="bio"
          rows="4"
          id="bio"
          placeholder="Enter about you"
        ></textarea>
      </div>
      <div className="form__control_login form__register_upload">
        <Avatar />
        <label htmlFor="avatar" style={uploadStyle}>
          <span className="register__uploader">
            <span className="register__uploader_info">Profile photo</span>
            <span className="register__uploader_btn">
              <i className="fa fa-camera"></i>
            </span>
          </span>
        </label>
        <input
          type="file"
          name="avatar"
          id="avatar"
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>

      <div className="form__control_login">
        <button type="submit" className="submit__btn">
          Register
        </button>
      </div>
      <p className="form__footer_link">
        Already have account?{' '}
        <span
          className="form__register_link"
          onClick={() =>
            dispatch({
              type: OPEN_BOTTOM_NAV,
              payload: {
                elmt: 'login',
                title: 'Login',
                icon: 'lock',
              },
            })
          }
        >
          Login
        </span>
      </p>
    </form>
  );
};

export default Register;
