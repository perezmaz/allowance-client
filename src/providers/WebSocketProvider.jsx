/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import notificationApi from '../config/notificationApi';
import { count } from '../api/notification';
import { getToken } from '../api/auth';
import { ACCESS_TOKEN } from '../config/localStorage';

export const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
  const { t } = useTranslation();

  const [notificationsCount, setNotificationsCount] = useState();

  const [notificationAlert, setNotificationAlert] = useState({
    user: '',
    message: '',
    show: false,
  });

  const socket = io(`${notificationApi.HOST}:${notificationApi.SOCKET_PORT}`, { transports: ['websocket'], upgrade: false });

  const showNotificationAlert = data => {
    const token = getToken(ACCESS_TOKEN);
    if (token) {
      const payload = jwtDecode(token);

      if (payload._id === data.to) {
        setNotificationAlert({
          user: data.user,
          message: t(data.message),
          show: true,
        });

        setTimeout(() => {
          setNotificationAlert({
            user: '',
            message: '',
            show: false,
          });
        }, 3500);
      }
    }
  };

  useEffect(() => {
    socket.on('newNotification', data => showNotificationAlert(data));
  }, []);

  useEffect(() => {
    const token = getToken(ACCESS_TOKEN);

    if (token) {
      count()
        .then(response => {
          if (response.code === 0) {
            setNotificationsCount(response.result);
          }
        });
    }
  }, [notificationsCount, notificationAlert]);

  const provider = {
    notificationsCount,
    notificationAlert,
  };

  return (
    <WebSocketContext.Provider value={provider}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
