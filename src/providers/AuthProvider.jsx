/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import jwtDecode from 'jwt-decode';
import { getToken, refreshAccessToken, logout } from '../api/auth';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../config/localStorage';

export const AuthContext = createContext();

const checkUserLogin = async setUser => {
  const accessToken = getToken(ACCESS_TOKEN);

  if (!accessToken) {
    const refreshToken = getToken(REFRESH_TOKEN);

    if (!refreshToken) {
      logout();

      setUser({
        user: null,
        isLoading: false,
      });
    } else {
      await refreshAccessToken(refreshToken);
      const newAccessToken = getToken(ACCESS_TOKEN);
      setUser({
        user: jwtDecode(newAccessToken),
        isLoading: false,
      });
    }
  } else {
    setUser({
      user: jwtDecode(accessToken),
      isLoading: false,
    });
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    checkUserLogin(setUser);
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
