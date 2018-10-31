import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { isLoggedIn } from './auth';

export const PrivateRoute = ({ component: Component, currentUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() && currentUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
