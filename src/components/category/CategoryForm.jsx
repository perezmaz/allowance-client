/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainForm from '../MainForm';
import useMessage from '../../hooks/useMessage';
import { save, edit, update } from '../../api/category';

const CategoryForm = props => {
  const { match, tutorial = false, saveCallBack = null } = props;
  const { params } = match;
  const { id = 0 } = params;

  const { t } = useTranslation();

  const { openNotificationMessage } = useMessage();

  const [inputs, setInputs] = useState([
    {
      name: 'category',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
    {
      name: 'active',
      value: false,
      isInvalid: false,
      validationMessage: '',
    },
  ]);

  useEffect(() => {
    if (id !== 0) {
      edit(id)
        .then(response => {
          if (response.code === 0) {
            const { category, active } = response.result;
            setInputs([
              {
                name: 'category',
                value: category,
                isInvalid: false,
                validationMessage: '',
              },
              {
                name: 'active',
                value: active,
                isInvalid: false,
                validationMessage: '',
              },
            ]);
          } else {
            openNotificationMessage('error', t(`category.message.${response.code}`));
          }
        });
    }
  }, [id]);

  const saveRecord = async event => {
    event.preventDefault();
    event.target.setAttribute('disabled', 'disabled');

    const request = {
      category: inputs.find(aux => aux.name === 'category').value,
      active: inputs.find(aux => aux.name === 'active').value,
    };

    let response = '';
    if (id === 0) {
      response = await save(request);
    } else {
      response = await update(id, request);
    }

    let type = 'info';
    if (response.code !== 0) {
      event.target.removeAttribute('disabled');
      type = 'danger';
    } else if (!saveCallBack) {
      openNotificationMessage(type, t(`child.message.${response.code}`));
    } else {
      saveCallBack();
    }
    openNotificationMessage(type, t(`category.message.${response.code}`));
  };

  const information = (
    <div>
      {t('category.form.info')}
      (
      <span className="text-danger">*</span>
      )
    </div>
  );

  const formData = {
    information,
    controls: [
      {
        name: 'category',
        label: t('category.form.control1'),
        type: 'text',
        sizeXs: 12,
        sizeMd: 6,
        validation: 'name|required|length:1,30',
      },
      {
        name: 'active',
        label: t('category.form.control2'),
        type: 'checkbox',
        sizeXs: 12,
        sizeMd: 6,
      },
    ],
    actions: [
      {
        variant: 'primary',
        text: t('action.save'),
        onClick: saveRecord,
      },
      {
        url: '/category',
        variant: 'default',
        text: t('action.back'),
      },
    ],
  };

  if (tutorial) {
    formData.actions = [
      {
        variant: 'primary',
        text: t('action.saveContinue'),
        onClick: saveRecord,
      },
    ];
  }

  return (
    <MainForm
      information={formData.information}
      controls={formData.controls}
      actions={formData.actions}
      inputs={inputs}
      setInputs={setInputs}
    />
  );
};

export default CategoryForm;
