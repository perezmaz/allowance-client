/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  Redirect,
  Route,
} from 'react-router-dom';
import { logout } from '../api/auth';

const MainRoute = ({ isAuth, isPrivate, path, ...rest }) => {
  if (!isAuth) {
    if (!isPrivate) {
      return <Route path={path} {...rest} />;
    }
    return <Redirect to="/login" />;
  }
  if (isPrivate) {
    return <Route path={path} {...rest} />;
  }
  if (path === '/activate/:token') {
    logout();
    window.location = '/';
  }
  return <Redirect to="/" />;
};

export default MainRoute;
