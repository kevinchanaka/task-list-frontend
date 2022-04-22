import {useAuth} from '../context/Auth';
import React from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  children: React.ReactElement
}

function PrivateRoute({children, ...rest}: PrivateRouteProps): JSX.Element {
  const {isLoggedIn} = useAuth();
  return (
    <React.Fragment>
      {isLoggedIn() ?
        <Route exact {...rest}>{children}</Route> :
        <Redirect to="/login"></Redirect>
      }
    </React.Fragment>
  );
}

export default PrivateRoute;
