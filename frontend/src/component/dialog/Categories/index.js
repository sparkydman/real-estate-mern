import React from 'react';
import './categories.css';

const Categories = () => {
  return (
    <div className="categories">
      <div className="category__card">
        <div className="card__img_categories">
          <img src="/duplex.jpg" alt="room" />
        </div>
        <div className="card__body_categories">
          <h4>Duplex</h4>
        </div>
      </div>
      <div className="category__card">
        <div className="card__img_categories">
          <img src="/bungalow.jpg" alt="room" />
        </div>
        <div className="card__body_categories">
          <h4>Bungalow</h4>
        </div>
      </div>
      <div className="category__card">
        <div className="card__img_categories">
          <img src="/room.jpg" alt="room" />
        </div>
        <div className="card__body_categories">
          <h4>Room</h4>
        </div>
      </div>
      <div className="category__card">
        <div className="card__img_categories">
          <img src="/shop.jpg" alt="room" />
        </div>
        <div className="card__body_categories">
          <h4>Shops</h4>
        </div>
      </div>
      <div className="category__card">
        <div className="card__img_categories">
          <img src="/flat.jpg" alt="room" />
        </div>
        <div className="card__body_categories">
          <h4>Flat</h4>
        </div>
      </div>
      <div className="category__card">
        <div className="card__img_categories">
          <img src="/attach.jpg" alt="room" />
        </div>
        <div className="card__body_categories">
          <h4>Attach</h4>
        </div>
      </div>
      <div className="category__card">
        <div className="card__img_categories">
          <img src="/self-contain.jpg" alt="room" />
        </div>
        <div className="card__body_categories">
          <h4>Self-contain</h4>
        </div>
      </div>
      <div className="category__card">
        <div className="card__img_categories">
          <img src="/container.jpg" alt="room" />
        </div>
        <div className="card__body_categories">
          <h4>Container</h4>
        </div>
      </div>
      <div className="category__card">
        <div className="card__img_categories">
          <img src="/warehouse.jpg" alt="room" />
        </div>
        <div className="card__body_categories">
          <h4>Warehouse</h4>
        </div>
      </div>
      <div className="category__card">
        <div className="card__img_categories">
          <img src="/land.jpg" alt="room" />
        </div>
        <div className="card__body_categories">
          <h4>Land</h4>
        </div>
      </div>
    </div>
  );
};

export default Categories;
