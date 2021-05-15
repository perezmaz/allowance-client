/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainForm from '../../MainForm';
import RegisterFormHeader from './RegisterFormHeader';
import RegisterFormFooter from './RegisterFormFooter';
import { register } from '../../../api/user';
import useMessage from '../../../hooks/useMessage';
import { TUTORIAL } from '../../../config/localStorage';

const RegisterForm = props => {
  const { history } = props;

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
      name: 'name',
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
    {
      name: 'confirmPassword',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
  ]);

  const save = async event => {
    event.preventDefault();
    event.target.setAttribute('disabled', 'disabled');

    const request = {
      email: inputs.find(aux => aux.name === 'email').value,
      name: inputs.find(aux => aux.name === 'name').value,
      password: inputs.find(aux => aux.name === 'password').value,
      confirmPassword: inputs.find(aux => aux.name === 'confirmPassword').value,
    };
    const response = await register(request);

    let type = 'info';
    if (response.code !== 0) {
      type = 'danger';
      event.target.removeAttribute('disabled');
    } else {
      localStorage.setItem(TUTORIAL, 'incompleted');
      history.push('/login');
    }
    openNotificationMessage(type, t(`register.message.${response.code}`));
  };

  const formHeader = <RegisterFormHeader />;

  const formFooter = <RegisterFormFooter />;

  const formData = {
    information: '',
    controls: [
      {
        name: 'name',
        label: t('register.form.control2'),
        type: 'text',
        sizeXs: 12,
        sizeMd: 12,
        validation: 'text|required|length:3,20',
      },
      {
        name: 'email',
        label: t('register.form.control1'),
        type: 'email',
        sizeXs: 12,
        sizeMd: 12,
        validation: 'email|required',
      },
      {
        name: 'password',
        label: t('register.form.control3'),
        type: 'password',
        sizeXs: 12,
        sizeMd: 12,
        validation: 'required|password|length:8,20',
      },
      {
        name: 'confirmPassword',
        label: t('register.form.control4'),
        type: 'password',
        sizeXs: 12,
        sizeMd: 12,
        validation: 'required|password|compare:password,register.form.control3|length:8,20',
      },
    ],
    actions: [
      {
        variant: 'primary',
        text: t('action.register'),
        onClick: save,
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

export default RegisterForm;
