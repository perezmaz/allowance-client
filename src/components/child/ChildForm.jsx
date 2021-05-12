/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainForm from '../MainForm';
import useMessage from '../../hooks/useMessage';
import { save, edit, update } from '../../api/child';

const ChildForm = props => {
  const { history, match } = props;
  const { params } = match;
  const { id = 0 } = params;

  const { t } = useTranslation();

  const { openNotificationMessage } = useMessage();

  const [inputs, setInputs] = useState([
    {
      name: 'name',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
    {
      name: 'age',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
    {
      name: 'email',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
    {
      name: 'username',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
  ]);

  useEffect(() => {
    if (id !== 0) {
      edit(id)
        .then(response => {
          if (response.code === 0) {
            const { email, child, username } = response.result;
            const { name, age } = child;
            setInputs([
              {
                name: 'name',
                value: name,
                isInvalid: false,
                validationMessage: '',
              },
              {
                name: 'age',
                value: age,
                isInvalid: false,
                validationMessage: '',
              },
              {
                name: 'email',
                value: email,
                isInvalid: false,
                validationMessage: '',
              },
              {
                name: 'username',
                value: username,
                isInvalid: false,
                validationMessage: '',
              },
            ]);
          } else {
            openNotificationMessage('error', t(`child.message.${response.code}`));
          }
        });
    }
  }, [id]);

  const saveRecord = async event => {
    event.preventDefault();
    event.target.setAttribute('disabled', 'disabled');

    const request = {
      name: inputs.find(aux => aux.name === 'name').value,
      age: inputs.find(aux => aux.name === 'age').value,
      email: inputs.find(aux => aux.name === 'email').value,
      username: inputs.find(aux => aux.name === 'username').value,
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
    } else {
      history.goBack();
    }
    openNotificationMessage(type, t(`child.message.${response.code}`));
  };

  const information = (
    <div>
      {t('child.form.info')}
      (
      <span className="text-danger">*</span>
      )
    </div>
  );

  const formData = {
    information,
    controls: [
      {
        name: 'name',
        label: t('child.form.control1'),
        type: 'text',
        sizeXs: 8,
        sizeMd: 5,
        validation: 'name|required|length:1,30',
      },
      {
        name: 'age',
        label: t('child.form.control2'),
        type: 'text',
        sizeXs: 4,
        sizeMd: 2,
        validation: 'number|length:1,2',
      },
      {
        name: 'email',
        label: t('child.form.control3'),
        type: 'email',
        sizeXs: 12,
        sizeMd: 5,
        validation: 'email|required',
      },
      {
        name: 'username',
        label: t('child.form.control4'),
        type: 'text',
        sizeXs: 12,
        sizeMd: 5,
        validation: 'text|required|length:3,20',
      },
    ],
    actions: [
      {
        variant: 'primary',
        text: t('action.save'),
        onClick: saveRecord,
      },
      {
        url: '/child',
        variant: 'default',
        text: t('action.back'),
      },
    ],
  };

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

export default ChildForm;
