import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_BOTTOM_NAV } from '../../constants/ui';
import './Login.css';
import addProperty from '../../actions/createProperty';
import getErrMsg from '../util/errorMsg';
import Loader from '../util/Loader';

const initialState = {
  title: '',
  address: '',
  value_for: '',
  price: '',
  condition: '',
  category: '',
  compound_space: '',
  property_size: '',
  quantity: '',
  images: [],
  previews: [],
  description: '',
  agent: '',
  keywords: '',
};

const getPreviewUrl = (file) => URL.createObjectURL(file);

const AddProperty = ({ isAdmin = false }) => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();

  const createProperty = useSelector((state) => state.propertyDetail);
  const { loading, error, property } = createProperty;

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const files = e.target.files;
      Array.from(files).forEach((file) => {
        setValues({ ...values, avatar: file, preview: getPreviewUrl(file) });
      });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const [key, value] of Object.entries(values)) {
      form.append(key, value);
    }
    dispatch(addProperty(form));
  };

  useEffect(() => {
    if (!loading && property?.success) {
      dispatch({ type: CLOSE_BOTTOM_NAV });
    }
  }, [property, loading, dispatch]);

  const uploadStyle = {
    backgroundColor: values.preview ? '#5dd95d' : '#454a4d',
    color: '#fff',
  };

  return (
    <form className="login__form" onSubmit={onSubmit}>
      <div className="form__control_login">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter title..."
          value={values.title}
          onChange={onChange}
        />
        {!loading && error && (
          <small>{getErrMsg(error.path, error.message, 'title')}</small>
        )}
      </div>
      <div className="form__control_login">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Enter address..."
          value={values.address}
          onChange={onChange}
        />
        {!loading && error && (
          <small>{getErrMsg(error.path, error.message, 'address')}</small>
        )}
      </div>
      <div className="form__control_login">
        <label htmlFor="value_for">Value for </label>
        <select name="value_for" id="value_for" onChange={onChange}>
          <option defaultValue="">Select</option>
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
        {!loading && error && (
          <small>{getErrMsg(error.path, error.message, 'value_for')}</small>
        )}
      </div>
      <div className="form__control_login">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Enter price..."
          value={values.price}
          onChange={onChange}
        />
        {!loading && error && (
          <small>{getErrMsg(error.path, error.message, 'price')}</small>
        )}
      </div>
      <div className="form__control_login">
        <label htmlFor="condition">Property condition</label>
        <select name="condition" id="condition" onChange={onChange}>
          <option defaultValue="">Select condition</option>
          <option value="new">New</option>
          <option value="reconstructed">Reconstructed</option>
          <option value="old">Old</option>
          <option value="natural">Natural</option>
        </select>
      </div>
      <div className="form__control_login">
        <label htmlFor="category">Property category</label>
        <select name="category" id="category" onChange={onChange}>
          <option defaultValue="">Select category</option>
          <option value="duplex">Duplex</option>
          <option value="bungalow">Bungalow</option>
          <option value="flat">Flat</option>
          <option value="self-contain">Self-contain</option>
          <option value="shop">Shop</option>
          <option value="warehouse">Warehouse</option>
          <option value="land">Land</option>
        </select>
      </div>

      <div className="form__control_login">
        <label htmlFor="compound_space">Compound space</label>
        <input
          type="compound_space"
          name="compound_space"
          id="compound_space"
          placeholder="Enter compound_space..."
          value={values.compound_space}
          onChange={onChange}
        />
        {!loading && error && (
          <small>
            {getErrMsg(error.path, error.message, 'compound_space')}
          </small>
        )}
      </div>
      <div className="form__control_login">
        <label htmlFor="property_size">Property size</label>
        <input
          type="password"
          name="property_size"
          id="property_size"
          placeholder="Property size..."
          value={values.property_size}
          onChange={onChange}
        />
        {!loading && error && (
          <small>{getErrMsg(error.path, error.message, 'property_size')}</small>
        )}
      </div>
      <div className="form__control_login">
        <label htmlFor="description">About you</label>
        <textarea
          name="description"
          rows="4"
          id="description"
          placeholder="Enter about you"
          value={values.description}
          onChange={onChange}
        ></textarea>
      </div>
      <div className="form__control_login form__register_upload">
        <label htmlFor="avatar" style={uploadStyle}>
          <span className="register__uploader">
            <span className="register__uploader_info">Property photos</span>
            <span className="register__uploader_btn">
              <i className="fa fa-camera"></i>
            </span>
          </span>
        </label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={onChange}
        />
      </div>

      <div className="form__control_login">
        <button type="submit" className="submit__btn" disabled={loading}>
          {loading ? <Loader /> : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default AddProperty;
