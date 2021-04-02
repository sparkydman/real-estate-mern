import React from 'react';
import { useSelector } from 'react-redux';
import AdminProfileq from '../../component/admin-profile';
import AgentProfile from '../../component/agent-profile';
import CustomerProfile from '../../component/customer-profile';
import BottomNavDialog from '../../component/dialog/BottomNavDialog';
import Spinner from '../../component/spinner';
import getDialog from '../../component/util/dialog';
import './index.css';

const Profile = ({ user = {} }) => {
  const ui = useSelector((state) => state.ui);
  const { toggleBottomNav, element, title, icon } = ui;

  if (Object.keys(user).length === 0) {
    return (
      <div style={{ height: 'calc(100vh - 100px)' }}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="profile">
      {user.role === 'agent' ? (
        <AgentProfile user={user} />
      ) : user.role === 'admin' ? (
        <AdminProfileq user={user} />
      ) : (
        <CustomerProfile user={user} />
      )}
      {toggleBottomNav && (
        <BottomNavDialog title={title} icon={icon}>
          {getDialog(element)}
        </BottomNavDialog>
      )}
    </div>
  );
};

export default Profile;
