import React from 'react';
import './BottomNav.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TOGGLE_BOTTOM_NAV, CLOSE_BOTTOM_NAV } from '../../constants/ui';
// import getMe from '../../actions/getMe';

const BottomNav = () => {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const user = useSelector((state) => state.me);
  const { loading, me } = user;
  const { element } = ui;
  const history = useHistory();

  // useEffect(() => {
  //   dispatch(getMe());
  // }, [dispatch]);

  const handleClick = (elmt) => {
    switch (elmt) {
      case 'notification':
        return !loading && !me?.success
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
        return !loading && !me?.success
          ? dispatch({
              type: TOGGLE_BOTTOM_NAV,
              payload: { elmt: 'login', title: 'Login', icon: 'lock' },
            })
          : history.push('/profile');
      case 'cart':
        return !loading && !me?.success
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
