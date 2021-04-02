import React from 'react';
import './index.css';

const Customer = () => {
  return (
    <ul className="main__menu-profile">
      <li>
        <span>
          <i className="fa fa-user"></i> Edit profile
        </span>
      </li>
      <li>
        <span>
          <i className="fa fa-home"></i> Properties
        </span>
      </li>
      <li>
        <span>
          <i className="fa fa-heart"></i> Wishlist
        </span>
      </li>
    </ul>
  );
};

export default Customer;
