import React from 'react';
import './index.css';

const AgentJumbodrum = () => {
  return (
    <div className="info__grid">
      <div className="info__card">
        <h3 className="description">Total properties</h3>
        <span className="info__icon">
          <i className="fa fa-home fa-3x"></i>
        </span>
        <span className="info__price">204</span>
      </div>
      <div className="info__card">
        <h3 className="description">Sold properties</h3>
        <span className="info__icon">
          <i className="fa fa-home fa-3x"></i>
        </span>
        <span className="info__price">59</span>
      </div>
      <div className="info__card">
        <h3 className="description">Wallet</h3>
        <span className="info__icon">
          <i className="fa fa-credit-card fa-3x"></i>
        </span>
        <span className="info__price">123,045,000</span>
      </div>
    </div>
  );
};

export default AgentJumbodrum;
