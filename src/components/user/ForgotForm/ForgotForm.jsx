/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainForm from '../../MainForm';
import ForgotFormHeader from './ForgotFormHeader';
import ForgotFormFooter from './ForgotFormFooter';
import { forgot } from '../../../api/user';
import useMessage from '../../../hooks/useMessage';

const ForgotForm = () => {
  const { t } = useTranslation();
  const { openNotificationMessage } = useMessage();

  const [inputs, setInputs] = useState([
    {
      name: 'email',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
  ]);

  const reset = async event => {
    event.preventDefault();

    const request = {
      email: inputs.find(aux => aux.name === 'email').value,
    };

    const response = await forgot(request);

    let type = 'info';
    if (response.code !== 0) {
      type = 'danger';
      openNotificationMessage(type, t(`forgot.message.${response.code}`));
    } else {
      openNotificationMessage(type, t('forgot.message.0'));
      setTimeout(() => {
        window.location = '/';
      }, 3000);
    }
  };

  const formHeader = <ForgotFormHeader />;

  const formFooter = <ForgotFormFooter />;

  const formData = {
    information: '',
    controls: [
      {
        name: 'email',
        label: t('register.form.control1'),
        type: 'email',
        sizeXs: 12,
        sizeMd: 12,
        value: '',
        validation: 'email|required',
        isInvalid: false,
        validationMessage: '',
      },
    ],
    actions: [
      {
        variant: 'primary',
        text: t('action.reset'),
        onClick: reset,
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

export default ForgotForm;
