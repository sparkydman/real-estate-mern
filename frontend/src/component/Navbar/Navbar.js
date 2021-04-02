import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { CLOSE_BOTTOM_NAV, TOGGLE_BOTTOM_NAV } from '../../constants/ui';
import './Navbar.css';
import Categories from '../dialog/Categories';
import logout from '../../actions/logout';

const Navbar = () => {
  const [active, setActive] = useState('home');
  const [categories, setCategories] = useState(false);
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const user = useSelector((state) => state.me);
  const { loading, me } = user;
  const { toggleBottomNav } = ui;

  // console.log(user);
  // useEffect(() => {
  //   dispatch(getMe());
  // }, [dispatch]);

  const history = useHistory();

  useEffect(() => {
    if (toggleBottomNav) {
      setActive('signin');
    } else if (categories) {
      setActive('categories');
    }
  }, [toggleBottomNav, categories]);

  return (
    <div className="header">
      <div className="container">
        <div className="img__container">
          <img src="/bg-nav.jpg" alt="nav background" />
        </div>
        <div className="logo__container">
          <img src="/real-estate-logo.png" alt="" />
        </div>
        <div className="main__menu">
          <div className="top__menu">
            <p>#45 Mainland Lagos, Nigeria :Head office</p>
            <p>+2348122572924 :Contact</p>
            <ul className="social__media">
              <li>
                <a
                  href="https://facebook.com/calist23"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/barcafan_067"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram/gozie_rep"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-instagram-square"></i>
                </a>
              </li>
              <li>
                <a
                  href="mailto:gozieugwuede@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-google-plus"></i>
                </a>
              </li>
            </ul>
          </div>
          <ul className="bottom__menu">
            <li>
              <Link
                to="/"
                className={`link ${active === 'home' ? 'active__link' : ''}`}
                onClick={() => {
                  if (toggleBottomNav) dispatch({ type: CLOSE_BOTTOM_NAV });
                  if (categories) setCategories(false);
                  setActive('home');
                }}
              >
                Home
              </Link>
            </li>
            <li className="active__category">
              <span
                className={`link ${
                  active === 'categories' ? 'active__link' : ''
                }`}
                onClick={() => {
                  if (toggleBottomNav) dispatch({ type: CLOSE_BOTTOM_NAV });
                  setCategories(!categories);
                }}
              >
                Categories
              </span>
              <ul className="category__menu">
                <Categories />
              </ul>
            </li>
            <li>
              <Link
                to="/contact-us"
                className={`link ${active === 'contact' ? 'active__link' : ''}`}
                onClick={() => {
                  if (toggleBottomNav) dispatch({ type: CLOSE_BOTTOM_NAV });
                  if (categories) setCategories(false);
                  setActive('contact');
                }}
              >
                Contact us
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className={`link ${active === 'about' ? 'active__link' : ''}`}
                onClick={() => {
                  if (toggleBottomNav) dispatch({ type: CLOSE_BOTTOM_NAV });
                  setCategories(false);
                  setActive('about');
                }}
              >
                About us
              </Link>
            </li>
            {!loading && (
              <>
                {me?.success ? (
                  <li className="active__category">
                    <span
                      className={`link ${
                        active === 'about' ? 'active__link' : ''
                      }`}
                    >
                      Profile
                    </span>
                    <ul className="profile__dropdown">
                      <li
                        onClick={() => {
                          if (toggleBottomNav)
                            dispatch({ type: CLOSE_BOTTOM_NAV });
                          setCategories(false);
                          setActive('profile');
                          history.push('/profile');
                        }}
                      >
                        <span>View profile</span>
                      </li>
                      <li
                        onClick={() => {
                          if (toggleBottomNav)
                            dispatch({ type: CLOSE_BOTTOM_NAV });
                          setCategories(false);
                          setActive('profile');
                          dispatch(logout());
                        }}
                      >
                        <span>Logout</span>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li>
                    <span
                      className={`link ${
                        active === 'signin' ? 'active__link' : ''
                      }`}
                      onClick={() =>
                        dispatch({
                          type: TOGGLE_BOTTOM_NAV,
                          payload: {
                            elmt: 'login',
                            title: 'Login',
                            icon: 'lock',
                          },
                        })
                      }
                    >
                      Sign in
                    </span>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
