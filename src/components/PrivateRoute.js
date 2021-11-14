import useAuth from '../hooks/useAuth';
import React from 'react';
import {Redirect, Route} from 'react-router';

function PrivateRoute({children, ...rest}) {
  const {isLoggedIn} = useAuth();

  return (
    <React.Fragment>
      {isLoggedIn() ?
        <Route {...rest}>{children}</Route> :
        <Redirect to="/login"></Redirect>
      }
    </React.Fragment>
  );
}

export default PrivateRoute;
