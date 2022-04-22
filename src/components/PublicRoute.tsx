import {useAuth} from '../context/Auth';
import React from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';

interface PublicRouteProps extends RouteProps {
  children: React.ReactElement
}

function PublicRoute({children, ...rest}: PublicRouteProps): JSX.Element {
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
