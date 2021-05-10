/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../MainTable';
import useMessage from '../../hooks/useMessage';
import useModal from '../../hooks/useModal';
import { list, remove } from '../../api/category';

const CategoryList = props => {
  const { t } = useTranslation();

  const [records, setRecords] = useState([]);

  const { openNotificationMessage } = useMessage();

  const { handleShow, handleClose } = useModal();

  useEffect(() => {
    list().then(response => {
      if (response.code === 0) {
        setRecords(response.result);
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
        setRecords(response.result);
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
      url: '/category/new',
      link: t('category.list.new'),
    },
    tableData: records,
    tablePages: {
      paginate: false,
    },
    tableColumns: [
      {
        title: t('category.list.column1'),
        style: '',
        value: 'category',
      },
      {
        title: t('category.list.column2'),
        style: 'text-center w10',
        value: 'active',
        type: 'checkbox',
      },
    ],
    actions: [
      {
        icon: 'editar',
        url: '/category/edit',
        variant: 'primary',
        text: t('action.edit'),
      },
      {
        icon: 'eliminar',
        variant: 'danger',
        text: t('action.delete'),
        onClick: openModal,
        recordName: 'category',
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

export default CategoryList;
