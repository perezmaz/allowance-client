/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { useTranslation } from 'react-i18next';
import MainForm from '../../MainForm';
import TracingFormActivities from './TracingFormActivities';
import useMessage from '../../../hooks/useMessage';
import { update, edit } from '../../../api/tracing';
import useAuth from '../../../hooks/useAuth';

const TracingForm = props => {
  const { history, match } = props;
  const { params } = match;
  const { id = 0 } = params;

  const { t } = useTranslation();

  const { openNotificationMessage } = useMessage();

  const { user } = useAuth();

  const [inputs, setInputs] = useState([
    {
      name: 'child',
      value: '',
    },
    {
      name: 'date',
      value: '',
    },
    {
      name: 'amount',
      value: '',
    },
    {
      name: 'comments',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
    {
      name: 'feedback',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
  ]);

  const [activities, setActivities] = useState([]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (id !== 0) {
      edit(id)
        .then(response => {
          const { child, date, amount, comments, feedback, realAmount } = response.result;
          setInputs([
            {
              name: 'child',
              value: child.name,
            },
            {
              name: 'date',
              value: Moment(date).format(t('date.format')),
            },
            {
              name: 'amount',
              value: amount,
            },
            {
              name: 'comments',
              value: comments,
              isInvalid: false,
              validationMessage: '',
            },
            {
              name: 'feedback',
              value: feedback,
              isInvalid: false,
              validationMessage: '',
            },
          ]);

          const activityData = response.result.activities.map(item => (
            {
              _id: item._id,
              activity: item.activity,
              percent: item.basePercent,
              amount: item.baseAmount,
              realAmount: item.realAmount,
              tracingPercent: item.tracingPercent,
            }
          ));
          setActivities(activityData);

          setTotal(realAmount);
        })
        .catch(() => {
          openNotificationMessage('danger', t('tracing.message.-1'));
          history.goBack();
        });
    }
  }, [id]);

  const saveRecord = async event => {
    event.preventDefault();
    const request = {
      comments: inputs.find(aux => aux.name === 'comments').value,
      feedback: inputs.find(aux => aux.name === 'feedback').value,
    };

    const response = await update(id, request);

    let type = 'info';
    if (response.code !== 0) {
      type = 'danger';
    } else {
      history.goBack();
    }
    openNotificationMessage(type, t(`tracing.message.${response.code}`));
  };

  const formData = {
    information: '',
    controls: [
      {
        name: 'child',
        label: t('tracing.form.control1'),
        type: 'text',
        sizeXs: 12,
        sizeMd: 4,
        disabled: true,
      },
      {
        name: 'date',
        label: t('tracing.form.control2'),
        type: 'text',
        sizeXs: 12,
        sizeMd: 4,
        disabled: true,
      },
      {
        name: 'amount',
        label: t('tracing.form.control3'),
        type: 'text',
        sizeXs: 12,
        sizeMd: 4,
        disabled: true,
      },
      {
        name: 'comments',
        label: t('tracing.form.control4'),
        type: 'textarea',
        sizeXs: 12,
        sizeMd: 12,
        validation: 'text|length:0,5000',
        disabled: user.role !== 'parent',
      },
      {
        name: 'feedback',
        label: t('tracing.form.control5'),
        type: 'textarea',
        sizeXs: 12,
        sizeMd: 12,
        validation: 'text|length:0,5000',
        disabled: user.role !== 'child',
      },
    ],
    actions: [
      {
        variant: 'primary',
        text: t('action.save'),
        onClick: saveRecord,
      },
      {
        url: '/tracing',
        variant: 'default',
        text: t('action.back'),
      },
    ],
  };

  const loadActivities = (
    <TracingFormActivities
      activities={activities}
      setActivities={setActivities}
      total={total}
      setTotal={setTotal}
      isDisabled
    />
  );

  return (
    <MainForm
      information={formData.information}
      controls={formData.controls}
      actions={formData.actions}
      inputs={inputs}
      setInputs={setInputs}
      extendForm={loadActivities}
    />
  );
};

export default TracingForm;
