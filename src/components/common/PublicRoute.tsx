import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "hooks";
import { selectIsLoggedIn } from "redux/auth";

interface PublicRouteProps extends RouteProps {
  children: React.ReactElement;
}

export default function PublicRoute({ children, ...rest }: PublicRouteProps) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <React.Fragment>
      {!isLoggedIn ? (
        <Route exact {...rest}>
          {children}
        </Route>
      ) : (
        <Redirect to="/"></Redirect>
      )}
    </React.Fragment>
  );
}
