/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [notificationMessage, setNotificationMessage] = useState({
    show: false,
    message: '',
    type: '',
  });

  const openNotificationMessage = (type, message) => {
    setNotificationMessage({
      show: true,
      message,
      type,
    });
    setTimeout(() => {
      setNotificationMessage({
        show: false,
        message: '',
        type: '',
      });
    }, 3500);
  };

  const provider = {
    notificationMessage,
    openNotificationMessage,
  };

  return (
    <MessageContext.Provider value={provider}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
