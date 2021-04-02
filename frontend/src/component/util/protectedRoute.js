import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({
  component: Component,
  user: { loading, me, error },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !loading && error ? (
          <Redirect to="/" />
        ) : (
          <Component user={me?.data} {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  user: state.me,
});

export default connect(mapStateToProps)(ProtectedRoute);
