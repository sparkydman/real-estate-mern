import React from 'react';
import { useSelector } from 'react-redux';
import BottomNavDialog from '../../component/dialog/BottomNavDialog';
import getDialog from '../../component/util/dialog';
import './index.scss';

const Profile = () => {
  const ui = useSelector((state) => state.ui);
  const { toggleBottomNav, element, title, icon } = ui;

  return (
    <div className="profile">
      <div>hello from profile page</div>
      {toggleBottomNav && (
        <BottomNavDialog title={title} icon={icon}>
          {getDialog(element)}
        </BottomNavDialog>
      )}
    </div>
  );
};

export default Profile;
