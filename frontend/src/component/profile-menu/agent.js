import React from 'react';
import './index.css';

const AgentMenu = () => {
  return (
    <ul className="main__menu-profile">
      <li>
        <span>
          <i className="fa fa-user"></i> Edit profile
        </span>
      </li>
      <li>
        <span>
          <i className="fa fa-home"></i> Properties{' '}
          <i className="fa fa-sort-down"></i>
        </span>
        <ul className="sub__menu">
          <li>Add property</li>
          <li>My properties</li>
        </ul>
      </li>
      <li>
        <span>
          <i className="fa fa-credit-card"></i> Withdraws{' '}
          <i className="fa fa-sort-down"></i>
        </span>
        <ul className="sub__menu">
          <li>Request withdraws</li>
          <li>All withdraws</li>
        </ul>
      </li>
    </ul>
  );
};

export default AgentMenu;
