/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import { useTranslation } from 'react-i18next';
import MainTable from '../MainTable';
import MainList from '../MainList';
import useMessage from '../../hooks/useMessage';
import useModal from '../../hooks/useModal';
import { list, remove } from '../../api/note';

const NoteList = props => {
  const { t } = useTranslation();

  const [records, setRecords] = useState([]);

  const { openNotificationMessage } = useMessage();

  const { handleShow, handleClose } = useModal();

  const mapData = data => (
    data.map(record => (
      {
        _id: record._id,
        date: Moment(record.date).format(t('date.format')),
        child: record.child.name,
        note: record.note,
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
    openNotificationMessage(type, t(`note.message.delete.${removeResponse.code}`));
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
      url: '/note/new',
      link: t('note.list.new'),
    },
    tableData: records,
    tablePages: {
      paginate: false,
    },
    tableColumns: [
      {
        title: t('note.list.column1'),
        style: 'text-center w15',
        value: 'date',
      },
      {
        title: t('note.list.column2'),
        style: 'text-center w15',
        value: 'child',
      },
      {
        title: t('note.list.column3'),
        style: '',
        value: 'note',
      },
    ],
    actions: [
      {
        icon: 'editar',
        url: '/note/edit',
        variant: 'primary',
        text: t('action.edit'),
      },
      {
        icon: 'eliminar',
        variant: 'danger',
        text: t('action.delete'),
        onClick: openModal,
        recordName: 'date',
      },
    ],
  };

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

export default NoteList;
