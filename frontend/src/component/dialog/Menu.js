import React from 'react';
import './menu.scss';

const Menu = () => {
  return (
    <div className="menu__dialog">
      <ul>
        <li>
          <i className="fa fa-phone-square fa-3x"></i> Contact us
        </li>
        <li>
          <i className="fa fa-info-circle fa-3x"></i>About us
        </li>
        <li>
          <i className="fa fa-calendar-check fa-3x"></i>Events
        </li>
        <li>
          <i className="fa fa-th fa-3x"></i>Categories
        </li>
        <li>
          <i className="fa fa-sign-in-alt fa-3x"></i>Sign in
        </li>
        <li>
          <i className="fa fa-user-plus fa-3x"></i>Sign up
        </li>
        <li>
          <i className="fa fa-sign-out-alt fa-3x"></i>Sign out
        </li>
      </ul>
    </div>
  );
};

export default Menu;
