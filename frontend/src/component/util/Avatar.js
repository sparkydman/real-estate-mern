import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ width, height, url }) => {
  const style = {
    width,
    height,
    borderRadius: '50%',
    boxShadow: '0px 0px 3px #ddd',
    zIndex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
  };
  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  };
  const iconStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#e9ebee',
    fontSize: '2rem',
  };
  return (
    <span style={style}>
      {url ? (
        <img src={url} style={imgStyle} alt="" />
      ) : (
        <span style={iconStyle}>
          <i className="fa fa-user"></i>
        </span>
      )}
    </span>
  );
};

Avatar.defaultProps = {
  width: '70px',
  height: '70px',
};

Avatar.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  url: PropTypes.string,
};

export default Avatar;
