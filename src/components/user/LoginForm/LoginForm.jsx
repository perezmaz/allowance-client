/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainForm from '../../MainForm';
import LoginFormHeader from './LoginFormHeader';
import LoginFormFooter from './LoginFormFooter';
import { login } from '../../../api/user';
import useMessage from '../../../hooks/useMessage';
import { ACCESS_TOKEN, REFRESH_TOKEN, TUTORIAL } from '../../../config/localStorage';

const LoginForm = () => {
  const { t } = useTranslation();
  const { openNotificationMessage } = useMessage();

  const [inputs, setInputs] = useState([
    {
      name: 'email',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
    {
      name: 'password',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
  ]);

  const enter = async event => {
    event.preventDefault();

    const request = {
      email: inputs.find(aux => aux.name === 'email').value,
      password: inputs.find(aux => aux.name === 'password').value,
    };

    const response = await login(request);

    let type = 'info';
    if (response.code !== 0) {
      type = 'danger';
      openNotificationMessage(type, t(`login.message.${response.code}`));
    } else {
      localStorage.setItem(ACCESS_TOKEN, response.result.accessToken);
      localStorage.setItem(REFRESH_TOKEN, response.result.refreshToken);
      const tutorial = localStorage.getItem(TUTORIAL);
      if (tutorial === 'completed') {
        window.location.href = '/';
      } else {
        window.location.href = '/tutorial';
      }
    }
  };

  const formHeader = <LoginFormHeader />;

  const formFooter = <LoginFormFooter />;

  const formData = {
    information: '',
    controls: [
      {
        name: 'email',
        label: t('login.form.control1'),
        type: 'email',
        sizeXs: 12,
        sizeMd: 12,
        validation: 'email|required',
      },
      {
        name: 'password',
        label: t('login.form.control2'),
        type: 'password',
        sizeXs: 12,
        sizeMd: 12,
        validation: 'password|required|length:8,20',
      },
      {
        name: 'forgot',
        label: t('login.form.control3'),
        type: 'link',
        sizeXs: 12,
        sizeMd: 12,
        url: '/forgot',
      },
    ],
    actions: [
      {
        variant: 'primary',
        text: t('action.login'),
        onClick: enter,
      },
    ],
    formHeader,
    formFooter,
    hasDivider: false,
  };

  return (
    <MainForm
      information={formData.information}
      controls={formData.controls}
      actions={formData.actions}
      inputs={inputs}
      setInputs={setInputs}
      formHeader={formData.formHeader}
      formFooter={formData.formFooter}
      hasDivider={formData.hasDivider}
    />
  );
};

export default LoginForm;
