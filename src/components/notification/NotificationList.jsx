/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useNotification from '../../hooks/useNotification';
import useWebSocket from '../../hooks/useWebSocket';
import MainTable from '../MainTable';

const NotificationList = props => {
  const { t } = useTranslation();

  const { notificationsCount } = useWebSocket();

  const {
    notifications,
    showAllNotifications,
    openNotification,
  } = useNotification();

  useEffect(() => {
    showAllNotifications();
  }, [notificationsCount]);

  const goToComment = (event, id) => {
    event.preventDefault();
    const notification = notifications.find(item => item._id === id);
    if (notification) {
      openNotification(id, notification.linkId);
    }
  };

  const table = {
    tableData: notifications,
    tablePages: {
      paginate: false,
    },
    tableColumns: [
      {
        title: t('notification.list.column1'),
        style: '',
        value: 'name',
      },
      {
        title: t('notification.list.column2'),
        style: '',
        value: 'timeLeft',
      },
      {
        title: t('notification.list.column3'),
        style: '',
        value: 'message',
      },
    ],
    actions: [
      {
        icon: 'show',
        variant: 'primary',
        text: t('action.show'),
        onClick: goToComment,
      },
    ],
  };

  return (
    <MainTable
      newItem={table.newItem}
      tableHead={table.tableHead}
      tableData={table.tableData}
      tablePages={table.tablePages}
      tableColumns={table.tableColumns}
      actions={table.actions}
      {...props}
    />
  );
};

export default NotificationList;
