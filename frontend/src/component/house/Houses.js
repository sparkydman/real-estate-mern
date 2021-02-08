/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import HouseItem from './HouseItem';
// import houseImg from '/house.jpg';
import './Houses.css';

import { useSelector } from 'react-redux';

const overide = css`
  display: block;
  margin: 0 auto;
  border-color: #5dd95d;
`;

const Houses = () => {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [searchInput, setSearchInput] = React.useState('');

  const propertyList = useSelector((state) => state.propertyList);

  const { loading, properties, error } = propertyList;

  // const getHouses = () => {
  //   const postData = properties.data && properties
  //     .slice(offset, offset + perPage)
  //     .map((property, i) => <HouseItem key={i} property={property} />);
  //   setData(postData);
  //   setPageCount(Math.ceil(forSale.length / perPage));
  // };
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  const handInputChange = (input) => {
    setSearchInput(input);
  };

  const handleSubmit = () => {
    console.log(searchInput);
  };
  const handleFormsubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="houses" id="houses">
      <header style={{ backgroundImage: `url(/house.jpg)` }}>
        <h1>Search for a home</h1>

        <div className="search__container">
          <form>
            <div className="form__control">
              <input placeholder="Search for properties" />
              <span className="search__icon">
                <i className="fas fa-search"></i>
              </span>
            </div>
            <button type="submit">search</button>
          </form>
          <ul></ul>
        </div>
      </header>
      <div className="card__container">
        {loading ? (
          <div className="loader">
            <ClipLoader
              css={overide}
              size={100}
              color={'#5dd95d'}
              loading={loading}
            />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            {properties &&
              properties.success &&
              properties.data.map((property) => (
                <HouseItem key={properties.id} property={property} />
              ))}
            {/* <ReactPaginate
              previousLabel={'prev'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Houses;
