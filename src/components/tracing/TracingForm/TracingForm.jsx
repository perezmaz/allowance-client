/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { useTranslation } from 'react-i18next';
import MainForm from '../../MainForm';
import TracingFormActivities from './TracingFormActivities';
import TracingFormNotes from './TracingFormNotes';
import useMessage from '../../../hooks/useMessage';
import { save } from '../../../api/tracing';
import { list as listChild } from '../../../api/child';
import { list as listActivity } from '../../../api/activity';
import { listByChild } from '../../../api/note';
import { findAmount } from '../../../api/allowance';
import validate from '../../../validations';

const TracingForm = props => {
  const { history } = props;

  const { t } = useTranslation();

  const { openNotificationMessage } = useMessage();

  const [inputs, setInputs] = useState([
    {
      name: 'child',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
    {
      name: 'date',
      value: Moment().format(t('date.format')),
      isInvalid: false,
      validationMessage: '',
    },
    {
      name: 'amount',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
  ]);

  const [date, setDate] = useState(Moment().format('YYYY-MM-DD'));

  const [baseAmount, setBaseAmount] = useState(0);

  const [child, setChild] = useState('');

  const [children, setChildren] = useState([]);

  const [activities, setActivities] = useState([]);

  const [total, setTotal] = useState(0);

  const [notes, setNotes] = useState([]);

  const dateTransform = recordDate => {
    if (t('date.locale') === 'es') {
      const aux = recordDate.split('-');
      return `${aux[2]}-${aux[1]}-${aux[0]} 00:00:01`;
    }
    return `${date} 00:00:01`;
  };

  const setSelectChild = event => {
    const { value } = event.target;
    setChild(value);
  };

  const setSelectDate = value => setDate(dateTransform(value));

  const setSelectAmount = event => {
    const { value } = event.target;
    setBaseAmount(value);
  };

  useEffect(() => {
    listChild()
      .then(childResponse => {
        if (childResponse.code === 0) {
          const childData = childResponse.result.map(item => (
            {
              value: item._id,
              text: item.child.name,
            }
          ));
          setChildren([
            {
              value: '',
              text: 'Seleccione',
            },
            ...childData,
          ]);
        }
      });
  }, []);

  useEffect(() => {
    if ((date !== '') && (child !== '')) {
      const request = {
        date,
        child,
      };
      let newAmount = 0;
      findAmount(request)
        .then(response => {
          if (response.code === 0) {
            newAmount = response.result.amount;
          }
          setInputs(inputs.map(input => {
            const aux = input;
            if (input.name === 'amount') {
              aux.value = newAmount;
            }
            return aux;
          }));
          setBaseAmount(newAmount);
        });
    }
  }, [date, child]);

  useEffect(() => {
    const request = {
      'child._id': child,
    };
    if (child !== '') {
      listActivity(request)
        .then(response => {
          if (response.code === 0) {
            const activityData = response.result.map(item => {
              const activityAmount = baseAmount * (item.percent / 100);
              return (
                {
                  _id: item._id,
                  activity: item.activity,
                  percent: item.percent,
                  amount: activityAmount,
                  realAmount: 0,
                  tracingPercent: '',
                  isInvalid: false,
                  validationMessage: '',
                }
              );
            });
            setActivities(activityData);
            setTotal(0);
          }
        });
    } else {
      setActivities([]);
    }
  }, [child, baseAmount]);

  useEffect(() => {
    if ((date !== '') && (child !== '')) {
      const request = {
        child,
        date,
      };
      listByChild(request)
        .then(response => {
          if (response.code === 0) {
            setNotes(
              response.result.map(item => (
                {
                  date: Moment(item.date).format(t('date.format')),
                  note: item.note,
                }
              )),
            );
          }
        });
    } else {
      setNotes([]);
    }
  }, [child]);

  const validateActivities = () => {
    let isValid = true;
    const newInputs = activities.filter(item => {
      const refItem = item;
      const validatedInput = validate('number|required|length:1,3', t('tracing.subform.list.column4'), refItem.tracingPercent, [], t);
      refItem.isInvalid = false;
      refItem.validationMessage = '';
      if (!validatedInput.isValid) {
        isValid = false;
        refItem.isInvalid = true;
        refItem.validationMessage = validatedInput.message;
      }
      return true;
    });
    setActivities(newInputs);
    return isValid;
  };

  const saveRecord = async event => {
    event.preventDefault();
    event.target.setAttribute('disabled', 'disabled');

    if (validateActivities()) {
      const recordDate = inputs.find(aux => aux.name === 'date').value;
      const request = {
        child: inputs.find(aux => aux.name === 'child').value,
        date: dateTransform(recordDate),
        amount: inputs.find(aux => aux.name === 'amount').value,
        activities: activities.map(item => (
          {
            _id: item._id,
            tracingPercent: item.tracingPercent,
            amount: item.amount,
            realAmount: item.realAmount,
          }
        )),
      };

      const response = await save(request);

      let type = 'info';
      if (response.code !== 0) {
        event.target.removeAttribute('disabled');
        type = 'danger';
      } else {
        history.goBack();
      }
      openNotificationMessage(type, t(`tracing.message.${response.code}`));
    }
  };

  const information = (
    <div>
      {t('tracing.form.info')}
      (
      <span className="text-danger">*</span>
      )
    </div>
  );

  const formData = {
    information,
    controls: [
      {
        name: 'child',
        label: t('tracing.form.control1'),
        type: 'select',
        sizeXs: 12,
        sizeMd: 4,
        options: children,
        validation: 'required',
        afterChange: setSelectChild,
      },
      {
        name: 'date',
        label: t('tracing.form.control2'),
        type: 'datetime',
        sizeXs: 12,
        sizeMd: 4,
        afterChange: setSelectDate,
      },
      {
        name: 'amount',
        label: t('tracing.form.control3'),
        type: 'text',
        sizeXs: 12,
        sizeMd: 4,
        validation: 'number|required|length:1,10',
        afterChange: setSelectAmount,
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
    <>
      <TracingFormNotes
        notes={notes}
      />
      <TracingFormActivities
        activities={activities}
        setActivities={setActivities}
        total={total}
        setTotal={setTotal}
      />
    </>
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
