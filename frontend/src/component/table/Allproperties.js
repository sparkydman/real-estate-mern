import React from 'react';

const Allproperties = ({ properties }) => {
  return (
    <>
      <thead>
        <tr>
          <th>S/N</th>
          <th>Title</th>
          <th>Address</th>
          <th>Agent</th>
          <th>Price</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {properties.map((property, i) => (
          <tr key={property._id}>
            <td>{i + 1}</td>
            <td>{property.title}</td>
            <td>{property.address}</td>
            <td>{`${property.agent.firstname} ${property.agent.lastname}`}</td>
            <td>{property.price}</td>
            <td>{property.enable ? 'Approved' : 'Unapproved'}</td>
            <td>
              {property.enable ? <span>disable</span> : <span>enable</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default Allproperties;
