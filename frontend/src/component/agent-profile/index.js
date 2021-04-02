import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProperties } from '../../actions/properties';
import AgentMenu from '../profile-menu/agent';
import Allproperties from '../table/Allproperties';
import Avatar from '../util/Avatar';
import '../admin-profile/index.css';
import AgentJumbodrum from '../profile-jumbodrum/agent';

const AgentProfile = ({ user }) => {
  const propertyList = useSelector((state) => state.propertyList);
  const { loading, properties } = propertyList;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loading && !properties?.success) dispatch(getAllProperties());
  }, [loading, properties, dispatch]);
  return (
    <div className="profile__container">
      <div className="user__detail">
        <div className="user__top-info">
          <div className="user__avatar">
            <Avatar url={user.avatar} height="150px" width="150px" />
          </div>
          <div className="user__names">
            <h2>{`${user.firstname} ${user.lastname}`}</h2>
            <p className="user__email">
              <i className="fa fa-envelope"></i> {user.email}
            </p>
            <p className="role">
              <span>Role: </span> {user.role}
            </p>
          </div>
        </div>
        <div className="user__bottom-info">
          <AgentMenu />
        </div>
      </div>
      <div className="user__feed">
        <AgentJumbodrum />
        <div className="user__feed-table">
          <table className="dashboard__table">
            {!loading && properties?.success && (
              <Allproperties properties={properties.data} />
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
