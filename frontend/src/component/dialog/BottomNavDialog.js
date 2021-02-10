import React from 'react';
import PropTypes from 'prop-types';
import './BottomNavDialog.css';

const BottomNavDialog = ({ imgurl, title, children, icon }) => {
  return (
    <div className="bottomnav__dialog">
      <div className="bottomnav__dialog_container">
        <span className="top__dialog_info">
          {imgurl ? (
            <img src={imgurl} alt="" className="top__dialog_info_img" />
          ) : (
            <span className="top__dialog_info_icon">
              <i className={`fa fa-${icon}`}></i>
            </span>
          )}
          <span className="top__dialog_info_title">
            <p>{title}</p>
          </span>
        </span>
        <div className="dialog__info_container">{children}</div>
      </div>
    </div>
  );
};

BottomNavDialog.propTypes = {
  imgurl: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
};

export default BottomNavDialog;
