import {useAuth} from '../context/Auth';
import React from 'react';
import {Redirect, Route} from 'react-router';

function PublicRoute({children, ...rest}) {
  const {isLoggedIn} = useAuth();

  return (
    <React.Fragment>
      {!isLoggedIn() ?
        <Route {...rest}>{children}</Route> :
        <Redirect to="/"></Redirect>
      }
    </React.Fragment>
  );
}

export default PublicRoute;
