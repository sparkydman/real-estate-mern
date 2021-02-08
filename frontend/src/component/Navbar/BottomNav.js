import React from 'react';
import './BottomNav.css';

const BottomNav = () => {
  return (
    <ul className="bottomnav">
      <li className="bottomnav__item">
        <span>
          <i className="fa fa-bell"></i>
        </span>
      </li>
      <li className="bottomnav__item">
        <span>
          <i className="fa fa-user"></i>
        </span>
      </li>
      <li className="bottomnav__item">
        <span>
          <i className="fa fa-home"></i>
        </span>
      </li>
      <li className="bottomnav__item">
        <span>
          <i className="fa fa-shopping-cart"></i>
        </span>
      </li>
      <li className="bottomnav__item">
        <span>
          <i className="fa fa-bars"></i>
        </span>
      </li>
    </ul>
  );
};

export default BottomNav;
