import React from 'react';
import './categories.scss';

const Categories = () => {
  return (
    <div className="categories">
      <div className="category__card">
        <div className="card__img_categories">
          <img src="/room.jpg" alt="room" />
        </div>
        <div className="card__body_categories">
          <h3>Room</h3>
          <span>(12)</span>
        </div>
      </div>
      <div className="category__card">
        <div className="card__img_categories">
          <img src="/shop.jpg" alt="room" />
        </div>
        <div className="card__body_categories">
          <h3>Shops</h3>
          <span>(49)</span>
        </div>
      </div>
      <div className="category__card">
        <div className="card__img_categories">
          <img src="/flat.jpg" alt="room" />
        </div>
        <div className="card__body_categories">
          <h3>Flat</h3>
          <span>(102)</span>
        </div>
      </div>
      <div className="category__card">
        <div className="card__img_categories">
          <img src="/duplex.jpg" alt="room" />
        </div>
        <div className="card__body_categories">
          <h3>Duplex</h3>
          <span>(120)</span>
        </div>
      </div>
    </div>
  );
};

export default Categories;
