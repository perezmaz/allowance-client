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

const socket = io(`${notificationApi.HOST}:${notificationApi.SOCKET_PORT}`,
  {
    transports: ['websocket'],
    upgrade: false,
  });

const accessToken = getToken(ACCESS_TOKEN);
if (accessToken) {
  const payload = jwtDecode(accessToken);
  socket.emit('join', payload.parentId);
}

const WebSocketProvider = ({ children }) => {
  const { t } = useTranslation();

  const [notificationsCount, setNotificationsCount] = useState();

  const [notificationAlert, setNotificationAlert] = useState({
    user: '',
    message: '',
    show: false,
  });

  const [newMessage, setNewMessage] = useState(null);

  useEffect(() => {
    const showNotificationAlert = data => {
      const token = getToken(ACCESS_TOKEN);
      if (token) {
        const payload = jwtDecode(token);

        if ((payload._id === data.to) || (payload.username !== data.username)) {
          let show = true;
          if (!data.to && window.location.pathname === '/message') {
            show = false;
          }
          setNotificationAlert({
            user: data.user,
            message: t(data.message),
            show,
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

    socket.on('newNotification', data => showNotificationAlert(data));
  }, [notificationAlert]);

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
  }, [notificationAlert]);

  useEffect(() => {
    socket.on('newMessage', data => {
      setNewMessage(data);
    });
  }, [newMessage]);

  const sendChatNotification = () => {
    const token = getToken(ACCESS_TOKEN);

    if (token) {
      const payload = jwtDecode(token);

      const data = {
        message: 'notification.new.message',
        user: payload.name,
        username: payload.username,
        channel: payload.parentId,
      };
      socket.emit('newNotification', data);
    }
  };

  const provider = {
    newMessage,
    notificationsCount,
    notificationAlert,
    sendChatNotification,
  };

  return (
    <WebSocketContext.Provider value={provider}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
