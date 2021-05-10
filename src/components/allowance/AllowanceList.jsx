/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import Moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../MainTable';
import useMessage from '../../hooks/useMessage';
import useModal from '../../hooks/useModal';
import { list, remove } from '../../api/allowance';

const AllowanceList = props => {
  const { t } = useTranslation();

  const [records, setRecords] = useState([]);

  const { openNotificationMessage } = useMessage();

  const { handleShow, handleClose } = useModal();

  const mapData = data => (
    data.map(record => (
      {
        _id: record._id,
        amount: record.amount,
        from: Moment(record.from).format(t('date.format')),
        to: Moment(record.to).format(t('date.format')),
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
    openNotificationMessage(type, t(`allowance.message.delete.${removeResponse.code}`));
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
      url: '/allowance/new',
      link: t('allowance.list.new'),
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
        title: t('allowance.list.column1'),
        style: '',
        value: 'amount',
      },
      {
        title: t('allowance.list.column2'),
        style: '',
        value: 'from',
      },
      {
        title: t('allowance.list.column3'),
        style: '',
        value: 'to',
      },
    ],
    actions: [
      {
        icon: 'editar',
        url: '/allowance/edit',
        variant: 'primary',
        text: t('action.edit'),
      },
      {
        icon: 'eliminar',
        variant: 'danger',
        text: t('action.delete'),
        onClick: openModal,
        recordName: 'amount',
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

export default AllowanceList;
