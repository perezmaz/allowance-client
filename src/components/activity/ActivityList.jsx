/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../MainTable';
import useMessage from '../../hooks/useMessage';
import useModal from '../../hooks/useModal';
import { list, remove } from '../../api/activity';

const ActivityList = props => {
  const { t } = useTranslation();

  const [records, setRecords] = useState([]);

  const { openNotificationMessage } = useMessage();

  const { handleShow, handleClose } = useModal();

  const mapData = data => (
    data.map(record => (
      {
        _id: record._id,
        activity: record.activity,
        category: record.category.category,
        child: record.child.name,
        percent: record.percent,
        active: record.active,
      }
    ))
  );

  useEffect(() => {
    list().then(response => {
      if (response.code === 0) {
        setRecords(mapData(response.result));
      }
    });
  }, []);

  const removeItem = async id => {
    handleClose();

    const removeResponse = await remove(id);

    let type = 'info';
    if (removeResponse.code !== 0) {
      type = 'danger';
    } else {
      list().then(response => {
        setRecords(mapData(response.result));
      });
    }
    openNotificationMessage(type, t(`activity.message.delete.${removeResponse.code}`));
  };

  const openModal = (event, id, name) => {
    event.preventDefault();

    const buttons = [
      {
        text: 'Aceptar',
        variant: 'danger',
        onClick: () => removeItem(id),
      },
      {
        text: 'Cancelar',
        variant: 'default',
        onClick: handleClose,
      },
    ];

    handleShow(`¿Desea eliminar el registro ${name}?`, buttons);
  };

  const table = {
    newItem: {
      url: '/activity/new',
      link: t('activity.list.new'),
    },
    tableData: records,
    tablePages: {
      paginate: false,
      totalRecords: 100,
      totalPage: 10,
      activePage: 1,
      pages: 3,
    },
    tableColumns: [
      {
        title: t('activity.list.column1'),
        style: '',
        value: 'activity',
      },
      {
        title: t('activity.list.column2'),
        style: '',
        value: 'category',
      },
      {
        title: t('activity.list.column3'),
        style: '',
        value: 'child',
      },
      {
        title: t('activity.list.column4'),
        style: 'text-center w15',
        value: 'percent',
      },
      {
        title: t('activity.list.column5'),
        style: 'text-center w10',
        value: 'active',
        type: 'checkbox',
      },
    ],
    actions: [
      {
        icon: 'editar',
        url: '/activity/edit',
        variant: 'primary',
        text: t('action.edit'),
      },
      {
        icon: 'eliminar',
        variant: 'danger',
        text: t('action.delete'),
        onClick: openModal,
        recordName: 'activity',
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

export default ActivityList;
