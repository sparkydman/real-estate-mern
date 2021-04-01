import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_BOTTOM_NAV, OPEN_BOTTOM_NAV } from '../../constants/ui';
import Avatar from '../util/Avatar';
import './Login.css';
import registerUser from '../../actions/register';
import getErrMsg from '../util/errorMsg';
import Loader from '../util/Loader';

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  avatar: '',
  preview: '',
  bio: '',
};

const getPreviewUrl = (file) => URL.createObjectURL(file);

const Register = () => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();

  const login = useSelector((state) => state.login);
  const { loading, error, user } = login;

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const file = e.target.files[0];
      setValues({ ...values, avatar: file, preview: getPreviewUrl(file) });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const [key, value] of Object.entries(values)) {
      form.append(key, value);
    }
    dispatch(registerUser(form));
  };

  useEffect(() => {
    if (!loading && user?.success) {
      localStorage.setItem('token', `Bearer ${user.token}`);
      dispatch({ type: CLOSE_BOTTOM_NAV });
    }
  }, [user, loading, dispatch]);
  const uploadStyle = {
    backgroundColor: values.preview ? '#5dd95d' : '#454a4d',
    color: '#fff',
  };

  return (
    <form className="login__form" onSubmit={onSubmit}>
      <div className="form__control_login">
        <label htmlFor="firstname">First name</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="Enter firstname..."
          value={values.firstname}
          onChange={onChange}
        />
        {!loading && error && (
          <small>{getErrMsg(error.path, error.message, 'firstname')}</small>
        )}
      </div>
      <div className="form__control_login">
        <label htmlFor="lastname">Last name</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Enter lastname..."
          value={values.lastname}
          onChange={onChange}
        />
        {!loading && error && (
          <small>{getErrMsg(error.path, error.message, 'lastname')}</small>
        )}
      </div>
      <div className="form__control_login">
        <label htmlFor="phone">Phone number</label>
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="ex: +2348123456789"
          value={values.phone}
          onChange={onChange}
        />
        {!loading && error && (
          <small>{getErrMsg(error.path, error.message, 'phone')}</small>
        )}
      </div>
      <div className="form__control_login">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Enter email..."
          value={values.email}
          onChange={onChange}
        />
        {!loading && error && (
          <small>{getErrMsg(error.path, error.message, 'email')}</small>
        )}
      </div>
      <div className="form__control_login">
        <label htmlFor="role">Account Type</label>
        <select name="role" id="role" onChange={onChange}>
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
          value={values.password}
          onChange={onChange}
        />
        {!loading && error && (
          <small>{getErrMsg(error.path, error.message, 'password')}</small>
        )}
      </div>
      <div className="form__control_login">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm password..."
          value={values.confirmPassword}
          onChange={onChange}
        />
        {!loading && error && (
          <small>
            {getErrMsg(error.path, error.message, 'confirmPassword')}
          </small>
        )}
      </div>
      <div className="form__control_login">
        <label htmlFor="bio">About you</label>
        <textarea
          name="bio"
          rows="4"
          id="bio"
          placeholder="Enter about you"
          value={values.bio}
          onChange={onChange}
        ></textarea>
      </div>
      <div className="form__control_login form__register_upload">
        <Avatar url={values.preview} />
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
          onChange={onChange}
        />
      </div>

      <div className="form__control_login">
        <button type="submit" className="submit__btn" disabled={loading}>
          {loading ? <Loader /> : 'Register'}
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
