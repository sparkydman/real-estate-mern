import React, { useEffect } from 'react';
import Houses from '../component/house/Houses';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProperties } from '../actions/properties';
import BottomNavDialog from '../component/dialog/BottomNavDialog';
import getDialog from '../component/util/dialog';

const Home = () => {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const { toggleBottomNav, element, title, icon } = ui;
  const propertyList = useSelector((state) => state.propertyList);
  const { loading, properties } = propertyList;
  useEffect(() => {
    if (!loading && !properties?.success) dispatch(getAllProperties());
  }, [loading, properties, dispatch]);
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
