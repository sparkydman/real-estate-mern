import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

const HouseItem = ({ property }) => {
  return (
    <Link to={`/${property._id}`} className='card'>
      <div className='card__media'>
        <img
          src={property.cover ? property.cover.url : property.images[0].url}
          alt=''
        />
        <span>
          <i className='fas fa-images'></i>
          {property.images.length}
        </span>
      </div>
      <div className='card__body'>
        <div className='card__header'>
          <span className='property__createdAt'>
            {format(new Date(property.createdAt), 'dd MMM, yyyy HH:mm:ss')}
          </span>
          <span className='property__status'>
            <i className='fas fa-tag'></i>
          </span>
        </div>
        <div className='card__description'>
          <p>{property.title}</p>
        </div>

        <div className='card__actions'>
          <p className='address'>
            <span>
              <i className='fas fa-address-card '></i>
            </span>{' '}
            {property.address}
          </p>
          <div className='card__footer'>
            <span className='location'>
              <i className='fas fa-map-marker-alt'></i>
            </span>
            <span className='icon'>
              <i className='fas fa-hand-holding-usd'></i> {property.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

HouseItem.propTypes = {
  property: PropTypes.object.isRequired,
};

export default HouseItem;
