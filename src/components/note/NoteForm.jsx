/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import { useTranslation } from 'react-i18next';
import MainForm from '../MainForm';
import useMessage from '../../hooks/useMessage';
import { list } from '../../api/child';
import { save, edit, update } from '../../api/note';

const NoteForm = props => {
  const { history, match } = props;
  const { params } = match;
  const { id = 0 } = params;

  const { t } = useTranslation();

  const { openNotificationMessage } = useMessage();

  const [inputs, setInputs] = useState([
    {
      name: 'date',
      value: Moment().format(t('date.format')),
      isInvalid: false,
      validationMessage: '',
    },
    {
      name: 'child',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
    {
      name: 'note',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
  ]);

  const [children, setChildren] = useState([]);

  useEffect(() => {
    list()
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
    if (id !== 0) {
      edit(id)
        .then(response => {
          if (response.code === 0) {
            const { date, child, note } = response.result;
            setInputs([
              {
                name: 'date',
                value: Moment(date).format(t('date.format')),
                isInvalid: false,
                validationMessage: '',
              },
              {
                name: 'child',
                value: child._id,
                isInvalid: false,
                validationMessage: '',
              },
              {
                name: 'note',
                value: note,
                isInvalid: false,
                validationMessage: '',
              },
            ]);
          } else {
            openNotificationMessage('error', t(`note.message.${response.code}`));
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
    event.target.setAttribute('disabled', 'disabled');

    const request = {
      date: dateTransform(inputs.find(aux => aux.name === 'date').value),
      child: inputs.find(aux => aux.name === 'child').value,
      note: inputs.find(aux => aux.name === 'note').value,
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
    openNotificationMessage(type, t(`note.message.${response.code}`));
  };

  const information = (
    <div>
      {t('note.form.info')}
      (
      <span className="text-danger">*</span>
      )
    </div>
  );

  const formData = {
    information,
    controls: [
      {
        name: 'date',
        label: t('note.form.control1'),
        type: 'datetime',
        sizeXs: 12,
        sizeMd: 6,
      },
      {
        name: 'child',
        label: t('note.form.control2'),
        type: 'select',
        sizeXs: 12,
        sizeMd: 6,
        options: children,
        validation: 'required',
      },
      {
        name: 'note',
        label: t('note.form.control3'),
        type: 'textarea',
        sizeXs: 12,
        sizeMd: 12,
        validation: 'text|required|length:1,1000',
        rows: 10,
      },
    ],
    actions: [
      {
        variant: 'primary',
        text: t('action.save'),
        onClick: saveRecord,
      },
      {
        url: '/note',
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

export default NoteForm;
