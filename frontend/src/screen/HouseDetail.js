/* eslint-disable no-unused-vars */
import React from 'react';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import '../component/houseDetail/HouseDetail.css';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useDispatch, useSelector } from 'react-redux';
import getPropertyDetail from '../actions/propertyDetails';
import BottomNavDialog from '../component/dialog/BottomNavDialog';
import getDialog from '../component/util/dialog';

const overide = css`
  display: block;
  margin: 0 auto;
  border-color: #5dd95d;
`;

const HouseDetail = ({ match }) => {
  const [photoIndex, setPhotoIndex] = React.useState(null);
  const [isOpen, setOpen] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const { toggleBottomNav, element, title, icon } = ui;

  React.useEffect(() => {
    const id = match.params.houseId;
    dispatch(getPropertyDetail(id));
  }, [dispatch, match]);

  const propertyDetail = useSelector((state) => state.propertyDetail);
  const { loading, property, error } = propertyDetail;

  React.useEffect(() => {
    if (property && property.success) {
      const photos = property.data.images.map(({ url }) => url);
      setImages([...photos]);
    }
  }, [property]);

  return (
    <div style={{ height: '100vh', overflow: 'scroll' }}>
      {loading ? (
        <div>
          <ClipLoader
            css={overide}
            size={50}
            color={'#5dd95d'}
            loading={loading}
          />
        </div>
      ) : error ? (
        <div>
          <h2>{error}</h2>
        </div>
      ) : (
        property &&
        property.success && (
          <div className="main__container">
            <div className="property__top">
              <div className="img__div" onClick={() => setOpen(true)}>
                <img
                  src={
                    property.data.cover
                      ? property.data.cover.url
                      : property.data.images[0].url
                  }
                  alt=""
                />
                <span>
                  <i className="fas fa-images"></i>
                  {images.length}
                </span>
                <span></span>
                {isOpen && (
                  <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={
                      images[(photoIndex + images.length - 1) % images.length]
                    }
                    onCloseRequest={() => setOpen(false)}
                    onMovePrevRequest={() =>
                      setPhotoIndex(
                        (photoIndex + images.length - 1) % images.length
                      )
                    }
                    onMoveNextRequest={() =>
                      setPhotoIndex((photoIndex + 1) % images.length)
                    }
                  />
                )}
              </div>
              <div className="info__container">
                <p>{property.data.description}</p>
                <div className="address">
                  <h2>Address</h2>
                  <p>{property.data.address}</p>
                </div>
                <div className="agents">
                  <h2>Agent</h2>
                  <ul>
                    <li>
                      <div>
                        <img
                          src={property.data.agent.avatar}
                          alt=""
                          className="agent__avatar"
                        />
                        <p>{property.data.agent.firstname}</p>
                        <p>{property.data.agent.lastname}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="property__map">
                <div className="google__map"></div>
              </div>
            </div>
          </div>
        )
      )}
      {toggleBottomNav && (
        <BottomNavDialog title={title} icon={icon}>
          {getDialog(element)}
        </BottomNavDialog>
      )}
    </div>
  );
};

export default HouseDetail;
