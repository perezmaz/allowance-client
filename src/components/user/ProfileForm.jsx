/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useTranslation } from 'react-i18next';
import MainForm from '../MainForm';
import useMessage from '../../hooks/useMessage';
import { ACCESS_TOKEN } from '../../config/localStorage';
import { getToken } from '../../api/auth';
import { edit, uploadAvatar, update } from '../../api/user';
import api from '../../config/api';

const ProfileForm = () => {
  const { t } = useTranslation();

  const { openNotificationMessage } = useMessage();

  const [inputs, setInputs] = useState([
    {
      name: 'avatar',
      value: '',
      file: null,
    },
    {
      name: 'name',
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
      name: 'currentPassword',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
    {
      name: 'newPassword',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
    {
      name: 'confirmPassword',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
  ]);

  const token = getToken(ACCESS_TOKEN);
  let user = null;
  let id = 0;
  if (token) {
    user = jwtDecode(token);
    id = user._id;
  }

  useEffect(() => {
    edit(id)
      .then(async response => {
        if (response.code === 0) {
          const { email, role, parent, child, avatar } = response.result;

          let name = '';
          if (role === 'parent') {
            name = parent ? parent.name : '';
          } else {
            name = child ? child.name : '';
          }
          setInputs([
            {
              name: 'avatar',
              value: avatar ? `${api.HOST}:${api.PORT}/avatar/${avatar}` : '',
              file: null,
            },
            {
              name: 'name',
              value: name,
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
              name: 'currentPassword',
              value: '',
              isInvalid: false,
              validationMessage: '',
            },
            {
              name: 'newPassword',
              value: '',
              isInvalid: false,
              validationMessage: '',
            },
            {
              name: 'confirmPassword',
              value: '',
              isInvalid: false,
              validationMessage: '',
            },
          ]);
        } else {
          openNotificationMessage('error', t(`profile.message.${response.code}`));
        }
      });
  }, [id]);

  const saveRecord = async event => {
    event.preventDefault();

    const request = {
      name: inputs.find(aux => aux.name === 'name').value,
      email: inputs.find(aux => aux.name === 'email').value,
    };

    if (inputs.find(aux => aux.name === 'newPassword').value !== '') {
      request.currentPassword = inputs.find(aux => aux.name === 'currentPassword').value;
      request.newPassword = inputs.find(aux => aux.name === 'newPassword').value;
      request.confirmPassword = inputs.find(aux => aux.name === 'confirmPassword').value;
    }

    const requestUpload = {
      avatar: inputs.find(aux => aux.name === 'avatar').file,
    };

    if (requestUpload.avatar !== null) {
      await uploadAvatar(id, requestUpload);
    }

    const response = await update(id, request);

    let type = 'info';
    if (response.code !== 0) {
      type = 'danger';
    } else {
      localStorage.setItem(ACCESS_TOKEN, response.result.accessToken);
      window.location = '/';
    }
    openNotificationMessage(type, t('profile.message.0'));
  };

  const information = (
    <div>
      {t('profile.form.info')}
      (
      <span className="text-danger">*</span>
      )
    </div>
  );

  const formData = {
    information,
    controls: [
      {
        name: 'avatar',
        label: '',
        type: 'avatar',
        sizeXs: 12,
        sizeMd: 12,
      },
      {
        name: 'name',
        label: t('profile.form.control1'),
        type: 'text',
        sizeXs: 12,
        sizeMd: 6,
        validation: 'name|required|length:3,30',
      },
      {
        name: 'email',
        label: t('profile.form.control3'),
        type: 'email',
        sizeXs: 12,
        sizeMd: 6,
        validation: 'email|required',
      },
      {
        name: 'currentPassword',
        label: t('profile.form.control4'),
        type: 'password',
        sizeXs: 12,
        sizeMd: 4,
        validation: 'password|length:0,20',
      },
      {
        name: 'newPassword',
        label: t('profile.form.control5'),
        type: 'password',
        sizeXs: 12,
        sizeMd: 4,
        validation: 'password|length:0,20',
      },
      {
        name: 'confirmPassword',
        label: t('profile.form.control6'),
        type: 'password',
        sizeXs: 12,
        sizeMd: 4,
        validation: 'password|compare:newPassword,profile.form.control5|length:0,20',
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

  return (
    <>
      <MainForm
        information={formData.information}
        controls={formData.controls}
        actions={formData.actions}
        inputs={inputs}
        setInputs={setInputs}
      />
    </>
  );
};

export default ProfileForm;
