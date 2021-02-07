import React, { useEffect } from 'react';
// import About from "./about/About";
// import Footer from "./footer/Footer";
import Houses from '../component/house/Houses';
import { useDispatch } from 'react-redux';
import { getAllProperties } from '../actions/properties';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);
  return (
    <>
      <Houses />
      {/* <About />
      <Footer /> */}
    </>
  );
};

export default Home;
