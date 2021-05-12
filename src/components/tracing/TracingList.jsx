/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import Moment from 'moment';
import { React, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../MainTable';
import MainList from '../MainList';
import useMessage from '../../hooks/useMessage';
import useModal from '../../hooks/useModal';
import { list, remove } from '../../api/tracing';
import useAuth from '../../hooks/useAuth';

const TracingList = props => {
  const { t } = useTranslation();

  const [records, setRecords] = useState([]);

  const { openNotificationMessage } = useMessage();

  const { handleShow, handleClose } = useModal();

  const { user } = useAuth();

  const mapData = data => (
    data.map(record => (
      {
        _id: record._id,
        child: record.child.name,
        amount: record.amount,
        date: Moment(record.date).format('DD-MM-YYYY'),
        realAmount: record.realAmount,
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
    openNotificationMessage(type, t(`tracing.message.delete.${removeResponse.code}`));
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
      url: '/tracing/new',
      link: t('tracing.list.new'),
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
        title: t('tracing.list.column1'),
        style: '',
        value: 'child',
      },
      {
        title: t('tracing.list.column2'),
        style: '',
        value: 'date',
      },
      {
        title: t('tracing.list.column3'),
        style: 'text-center w15',
        value: 'amount',
      },
      {
        title: t('tracing.list.column4'),
        style: 'text-center w15',
        value: 'realAmount',
      },
    ],
    actions: [
      {
        icon: 'editar',
        url: '/tracing/edit',
        variant: 'primary',
        text: t('action.edit'),
      },

    ],
  };

  if (user.role === 'parent') {
    table.actions = [
      ...table.actions,
      {
        icon: 'eliminar',
        variant: 'danger',
        text: t('action.delete'),
        onClick: openModal,
        recordName: 'date',
      },
    ];
  }

  return (
    <>
      <div className="d-sm-none">
        <MainList
          newItem={table.newItem}
          tableHead={table.tableHead}
          tableData={table.tableData}
          tablePages={table.tablePages}
          tableColumns={table.tableColumns}
          actions={table.actions}
          {...props}
        />
      </div>
      <div className="d-none d-sm-block">
        <MainTable
          newItem={table.newItem}
          tableHead={table.tableHead}
          tableData={table.tableData}
          tablePages={table.tablePages}
          tableColumns={table.tableColumns}
          actions={table.actions}
          {...props}
        />
      </div>
    </>
  );
};

export default TracingList;
