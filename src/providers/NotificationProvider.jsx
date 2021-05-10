/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';
import Moment from 'moment';
import { useTranslation } from 'react-i18next';
import { findAll, remove } from '../api/notification';

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const { t } = useTranslation();

  const [notifications, setNotifications] = useState([]);

  const timeLeft = duration => {
    if (duration.days() > 0) {
      return t('date.days.ago', { days: duration.days() });
    }
    if (duration.hours() > 0) {
      return t('date.hours.ago', { hours: duration.hours() });
    }
    if (duration.minutes() > 0) {
      return t('date.minutes.ago', { minutes: duration.minutes() });
    }
    return t('date.seconds.ago', { seconds: duration.seconds() });
  };

  const mapData = data => (
    data.map(item => {
      const {
        _id,
        userFrom,
        message,
        createdAt,
        linkId,
      } = item;

      const notificationDate = Moment(createdAt).unix();
      const currentTime = Moment().unix();
      const duration = Moment.duration((currentTime - notificationDate) * 1000, 'milliseconds');
      return (
        {
          _id,
          name: userFrom.name,
          message: t(message),
          createdAt,
          linkId,
          timeLeft: timeLeft(duration),
        }
      );
    }));

  const openNotification = (id, linkId) => {
    remove(id)
      .then(() => {
        window.location = `/tracing/edit/${linkId}`;
      });
  };

  const load = limit => {
    const params = {
      limit,
    };

    findAll(params)
      .then(response => {
        if (response.code === 0) {
          setNotifications(mapData(response.result));
        }
      });
  };

  const showNotifications = () => {
    load(5);
  };

  const showAllNotifications = () => {
    load(1000);
  };

  const provider = {
    notifications,
    openNotification,
    showAllNotifications,
    showNotifications,
  };

  return (
    <NotificationContext.Provider value={provider}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
