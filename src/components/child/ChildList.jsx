/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../MainTable';
import MainList from '../MainList';
import useMessage from '../../hooks/useMessage';
import useModal from '../../hooks/useModal';
import { list, remove } from '../../api/child';

const ChildList = props => {
  const { t } = useTranslation();

  const [records, setRecords] = useState([]);

  const { openNotificationMessage } = useMessage();

  const { handleShow, handleClose } = useModal();

  const mapData = data => (
    data.map(record => (
      {
        _id: record._id,
        name: record.child.name,
        age: record.child.age,
        email: record.email,
        username: record.username,
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
    openNotificationMessage(type, t(`category.message.delete.${removeResponse.code}`));
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
      url: '/child/new',
      link: t('child.list.new'),
    },
    tableData: records,
    tablePages: {
      paginate: false,
    },
    tableColumns: [
      {
        title: t('child.list.column1'),
        style: '',
        value: 'name',
      },
      {
        title: t('child.list.column2'),
        style: 'text-center w10',
        value: 'age',
      },
      {
        title: t('child.list.column3'),
        style: '',
        value: 'email',
      },
      {
        title: t('child.list.column4'),
        style: '',
        value: 'username',
      },
    ],
    actions: [
      {
        icon: 'editar',
        url: '/child/edit',
        variant: 'primary',
        text: t('action.edit'),
      },
      {
        icon: 'eliminar',
        variant: 'danger',
        text: t('action.delete'),
        onClick: openModal,
        recordName: 'name',
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

export default ChildList;
