import React, { useEffect, useState } from 'react';
import './menu.css';
import { useDispatch, useSelector } from 'react-redux';
import logoutUser from '../../actions/logout';
import { CLOSE_BOTTOM_NAV, OPEN_BOTTOM_NAV } from '../../constants/ui';
import { useHistory } from 'react-router-dom';
import Categories from '../dialog/Categories';

const Menu = () => {
  const [categories, setCategories] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const logout = useSelector((state) => state.logout);
  const { loading, status } = logout;

  useEffect(() => {
    if (!loading && status) {
      dispatch({ type: CLOSE_BOTTOM_NAV });
      window.location.href = '/';
    }
  }, [loading, status, dispatch]);

  return (
    <div className="menu__dialog">
      <ul>
        <li
          className={`${categories ? 'shrink' : ''}`}
          onClick={() => {
            history.push('/contact-us');
            dispatch({ type: CLOSE_BOTTOM_NAV });
          }}
        >
          <i className="fa fa-phone-square fa-3x"></i> Contact us
        </li>
        <li
          className={`${categories ? 'shrink' : ''}`}
          onClick={() => {
            history.push('/about-us');
            dispatch({ type: CLOSE_BOTTOM_NAV });
          }}
        >
          <i className="fa fa-info-circle fa-3x"></i>
          About us
        </li>
        <li className={`${categories ? 'shrink' : ''}`}>
          <i className="fa fa-calendar-check fa-3x"></i>Events
        </li>
        <li
          className={`${categories ? 'shrink category__btn' : ''}`}
          onClick={() => setCategories(!categories)}
        >
          <i className="fa fa-th fa-3x"></i>
          Categories
        </li>
        {categories && <Categories />}
        {localStorage.token ? (
          <li
            className={`${categories ? 'shrink' : ''}`}
            onClick={() => {
              dispatch(logoutUser());
            }}
          >
            <i className="fa fa-sign-out-alt fa-3x"></i> Sign out
          </li>
        ) : (
          <>
            <li
              className={`${categories ? 'shrink' : ''}`}
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
              <i className="fa fa-sign-in-alt fa-3x"></i>Sign in
            </li>
            <li
              className={`${categories ? 'shrink' : ''}`}
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
              <i className="fa fa-user-plus fa-3x"></i>Sign up
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
