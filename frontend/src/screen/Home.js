import React, { useEffect } from 'react';
import Houses from '../component/house/Houses';
import { useDispatch } from 'react-redux';
import { getAllProperties } from '../actions/properties';
import BottomNavDialog from '../component/dialog/BottomNavDialog';
// import Login from '../component/dialog/Login';
import Menu from '../component/dialog/Menu';
// import Register from '../component/dialog/Register';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);
  return (
    <>
      <Houses />
      <BottomNavDialog title="Register" icon="lock">
        <Menu />
      </BottomNavDialog>
    </>
  );
};

export default Home;
