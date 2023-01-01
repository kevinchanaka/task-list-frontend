import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "hooks";
import { selectIsLoggedIn } from "redux/auth";

interface PrivateRouteProps extends RouteProps {
  children: React.ReactElement;
}

export default function PrivateRoute({ children, ...rest }: PrivateRouteProps) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <React.Fragment>
      {isLoggedIn ? (
        <Route exact {...rest}>
          {children}
        </Route>
      ) : (
        <Redirect to="/login"></Redirect>
      )}
    </React.Fragment>
  );
}
