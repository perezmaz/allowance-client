/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import { useTranslation } from 'react-i18next';
import MainForm from '../MainForm';
import useMessage from '../../hooks/useMessage';
import { save, edit, update } from '../../api/allowance';

const AllowanceForm = props => {
  const { match, history } = props;
  const { params } = match;
  const { id = 0 } = params;

  const { t } = useTranslation();

  const { openNotificationMessage } = useMessage();

  const [inputs, setInputs] = useState([
    {
      name: 'amount',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
    {
      name: 'from',
      value: Moment().format(t('date.format')),
      isInvalid: false,
      validationMessage: '',
    },
    {
      name: 'to',
      value: Moment().format(t('date.format')),
      isInvalid: false,
      validationMessage: '',
    },
  ]);

  useEffect(() => {
    if (id !== 0) {
      edit(id)
        .then(response => {
          if (response.code === 0) {
            const { amount, from, to } = response.result;
            setInputs([
              {
                name: 'amount',
                value: amount,
                isInvalid: false,
                validationMessage: '',
              },
              {
                name: 'from',
                value: Moment(from).format(t('date.format')),
                isInvalid: false,
                validationMessage: '',
              },
              {
                name: 'to',
                value: Moment(to).format(t('date.format')),
                isInvalid: false,
                validationMessage: '',
              },
            ]);
          } else {
            openNotificationMessage('error', t(`allowance.message.${response.code}`));
          }
        });
    }
  }, [id]);

  const dateTransform = date => {
    if (t('date.locale') === 'es') {
      const aux = date.split('-');
      return `${aux[2]}-${aux[1]}-${aux[0]} 00:00:01`;
    }
    return `${date} 00:00:01`;
  };

  const saveRecord = async event => {
    event.preventDefault();

    const request = {
      amount: inputs.find(aux => aux.name === 'amount').value,
      from: dateTransform(inputs.find(aux => aux.name === 'from').value),
      to: dateTransform(inputs.find(aux => aux.name === 'to').value),
    };

    let response = '';
    if (id === 0) {
      response = await save(request);
    } else {
      response = await update(id, request);
    }

    let type = 'info';
    if (response.code !== 0) {
      type = 'danger';
    } else {
      history.goBack();
    }
    openNotificationMessage(type, t(`allowance.message.${response.code}`));
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
        name: 'amount',
        label: t('allowance.form.control1'),
        type: 'text',
        sizeXs: 12,
        sizeMd: 6,
        validation: 'number|required|length:1,10',
      },
      {
        name: 'from',
        label: t('allowance.form.control2'),
        type: 'datetime',
        sizeXs: 6,
        sizeMd: 3,
      },
      {
        name: 'to',
        label: t('allowance.form.control3'),
        type: 'datetime',
        sizeXs: 6,
        sizeMd: 3,
      },
    ],

    actions: [
      {
        variant: 'primary',
        text: t('action.save'),
        onClick: saveRecord,
      },
      {
        url: '/allowance',
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

export default AllowanceForm;
