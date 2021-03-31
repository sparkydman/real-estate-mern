import React from 'react';

const Loader = () => {
  return (
    <span
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src="/loader.gif" alt="loading..." />
    </span>
  );
};

export default Loader;
