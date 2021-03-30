import React, { useEffect } from 'react';
import Houses from '../component/house/Houses';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProperties } from '../actions/properties';
import BottomNavDialog from '../component/dialog/BottomNavDialog';
import Login from '../component/dialog/Login';
import Menu from '../component/dialog/Menu';
import Register from '../component/dialog/Register';
import Notification from '../component/dialog/Notification';
import Cart from '../component/dialog/Cart';

const getDialog = (state) => {
  switch (state) {
    case 'notification':
      return <Notification />;
    case 'cart':
      return <Cart />;
    case 'login':
      return <Login />;
    case 'register':
      return <Register />;
    case 'menu':
      return <Menu />;
    default:
      return;
  }
};

const Home = () => {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const { toggleBottomNav, element, title, icon } = ui;
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);
  return (
    <>
      <Houses />
      {toggleBottomNav && (
        <BottomNavDialog title={title} icon={icon}>
          {getDialog(element)}
        </BottomNavDialog>
      )}
    </>
  );
};

export default Home;
