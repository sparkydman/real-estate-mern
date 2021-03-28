import React from 'react';
// import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  // const flipWord = (word) => word.split("").reverse().reverse().join("");

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
              <a href="/#home">Home</a>
            </li>
            <li>
              <a href="/#houses">Categories</a>
            </li>
            <li>
              <a href="/#about-us">Contact us</a>
            </li>
            <li>
              <a href="/#about-us">About us</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
