import {useAuth} from '../context/Auth';
import React from 'react';
import {Redirect, Route} from 'react-router-dom';

function PublicRoute({children, ...rest}) {
  const {isLoggedIn} = useAuth();

  return (
    <React.Fragment>
      {!isLoggedIn() ?
        <Route exact {...rest}>{children}</Route> :
        <Redirect to="/"></Redirect>
      }
    </React.Fragment>
  );
}

export default PublicRoute;
