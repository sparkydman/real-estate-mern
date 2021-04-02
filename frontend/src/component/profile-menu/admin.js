import React from 'react';
import './index.css';

const AdminMenu = () => {
  return (
    <ul className="main__menu-profile">
      <li>
        <span>
          <i className="fa fa-home"></i> Properties{' '}
          <i className="fa fa-sort-down"></i>
        </span>
        <ul className="sub__menu">
          <li>Add property</li>
          <li>Approved properties</li>
          <li>Unapproved properties</li>
          <li>Sold properties</li>
        </ul>
      </li>
      <li>
        <span>
          <i className="fa fa-users"></i> Users{' '}
          <i className="fa fa-sort-down"></i>
        </span>
        <ul className="sub__menu">
          <li>Add user</li>
          <li>Active users</li>
          <li>Suspended users</li>
          <li>Agent users</li>
          <li>Customer users</li>
        </ul>
      </li>

      <li>
        <span>
          <i className="fa fa-credit-card"></i> Withdraws{' '}
          <i className="fa fa-sort-down"></i>
        </span>
        <ul className="sub__menu">
          <li>Requested withdraws</li>
          <li>Approved withdraws</li>
          <li>Rejected withdraws</li>
        </ul>
      </li>
    </ul>
  );
};

export default AdminMenu;
