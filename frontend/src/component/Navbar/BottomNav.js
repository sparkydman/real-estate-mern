import React from 'react';
import './BottomNav.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TOGGLE_BOTTOM_NAV, CLOSE_BOTTOM_NAV } from '../../constants/ui';

const BottomNav = ({ user = {} }) => {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const { element } = ui;
  const isEmpty = Object.keys(user).length === 0;
  const history = useHistory();

  const handleClick = (elmt) => {
    // if (toggleBottomNav) {
    //   dispatch({ type: CLOSE_BOTTOM_NAV });
    // }
    switch (elmt) {
      case 'notification':
        return isEmpty
          ? dispatch({
              type: TOGGLE_BOTTOM_NAV,
              payload: { elmt: 'login', title: 'Login', icon: 'lock' },
            })
          : dispatch({
              type: TOGGLE_BOTTOM_NAV,
              payload: {
                elmt: 'notification',
                title: 'Notications',
                icon: 'bell',
              },
            });
      case 'profile':
        return isEmpty
          ? dispatch({
              type: TOGGLE_BOTTOM_NAV,
              payload: { elmt: 'login', title: 'Login', icon: 'lock' },
            })
          : history.push(`/profile/${user._id}`);
      case 'cart':
        return isEmpty
          ? dispatch({
              type: TOGGLE_BOTTOM_NAV,
              payload: {
                elmt: 'login',
                title: 'Login',
                icon: 'lock',
              },
            })
          : history.push('/cart');
      case 'menu':
        return dispatch({
          type: TOGGLE_BOTTOM_NAV,
          payload: { elmt: 'menu', title: 'Menu', icon: 'bars' },
        });
      default:
        return;
    }
  };

  return (
    <ul className="bottomnav">
      <li
        className={`bottomnav__item ${
          element === 'notification' ? 'active__bottomnav' : ''
        }`}
        onClick={() => handleClick('notification')}
      >
        <span>
          <i className="fa fa-bell"></i>
        </span>
      </li>
      <li
        className={`bottomnav__item ${
          element === 'profile' ? 'active__bottomnav' : ''
        }`}
        onClick={() => handleClick('profile')}
      >
        <span>
          <i className="fa fa-user"></i>
        </span>
      </li>
      <li
        className={`bottomnav__item ${!element ? 'active__bottomnav' : ''}`}
        onClick={() => {
          history.push('/');
          dispatch({
            type: CLOSE_BOTTOM_NAV,
          });
        }}
      >
        <span>
          <i className="fa fa-home"></i>
        </span>
      </li>
      <li
        className={`bottomnav__item ${
          element === 'cart' ? 'active__bottomnav' : ''
        }`}
        onClick={() => handleClick('cart')}
      >
        <span>
          <i className="fa fa-shopping-cart"></i>
        </span>
      </li>
      <li
        className={`bottomnav__item ${
          element === 'menu' ? 'active__bottomnav' : ''
        }`}
        onClick={() => handleClick('menu')}
      >
        <span>
          <i className="fa fa-bars"></i>
        </span>
      </li>
    </ul>
  );
};

export default BottomNav;
