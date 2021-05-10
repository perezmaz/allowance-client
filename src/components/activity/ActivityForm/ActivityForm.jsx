/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainForm from '../../MainForm';
import ActivityFormPercentLeft from './ActivityFormPercentLeft';
import useMessage from '../../../hooks/useMessage';
import { list as listCategory } from '../../../api/category';
import { list as listChild } from '../../../api/child';
import { save, edit, update, findPercentLeft } from '../../../api/activity';

const ActivityForm = props => {
  const { history, match } = props;
  const { params } = match;
  const { id = 0 } = params;

  const { t } = useTranslation();

  const { openNotificationMessage } = useMessage();

  const [inputs, setInputs] = useState([
    {
      name: 'activity',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
    {
      name: 'category',
      value: '',
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
      name: 'percent',
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
    {
      name: 'description',
      value: '',
      isInvalid: false,
      validationMessage: '',
    },
  ]);

  const [categories, setCategories] = useState([]);

  const [children, setChildren] = useState([]);

  const [percentLeft, setPercentLeft] = useState(0);

  const [selectedChild, setSelectedChild] = useState('');

  const setChild = event => {
    const { value } = event.target;
    setSelectedChild(value);
  };

  useEffect(() => {
    const data = {
      active: true,
    };

    listCategory(data)
      .then(categoryResponse => {
        if (categoryResponse.code === 0) {
          const categoriesData = categoryResponse.result.map(item => (
            {
              value: item._id,
              text: item.category,
            }
          ));
          setCategories([
            {
              value: '',
              text: 'Seleccione',
            },
            ...categoriesData,
          ]);
        }
      });
  }, []);

  useEffect(() => {
    const data = {
      active: true,
    };

    listChild(data)
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
            const {
              activity,
              category,
              child,
              percent,
              active,
              description,
            } = response.result;
            setInputs([
              {
                name: 'activity',
                value: activity,
                isInvalid: false,
                validationMessage: '',
              },
              {
                name: 'category',
                value: category._id,
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
                name: 'percent',
                value: percent,
                isInvalid: false,
                validationMessage: '',
              },
              {
                name: 'active',
                value: active,
                isInvalid: false,
                validationMessage: '',
              },
              {
                name: 'description',
                value: description,
                isInvalid: false,
                validationMessage: '',
              },
            ]);

            const data = {
              child: child._id,
            };

            findPercentLeft(data)
              .then(responsePercent => {
                if (responsePercent.code === 0) {
                  setPercentLeft(responsePercent.result.percentLeft + percent);
                } else {
                  setPercentLeft(100);
                }
              });
          } else {
            openNotificationMessage('error', t(`activity.message.${response.code}`));
          }
        });
    } else {
      setPercentLeft(100);
    }
  }, [id]);

  useEffect(() => {
    if (selectedChild !== '') {
      const data = {
        child: selectedChild,
      };

      findPercentLeft(data)
        .then(responsePercent => {
          if (responsePercent.code === 0) {
            setPercentLeft(responsePercent.result.percentLeft);
          } else {
            setPercentLeft(100);
          }
        });
    }
  }, [selectedChild]);

  const saveRecord = async event => {
    event.preventDefault();

    const currentPercent = inputs.find(aux => aux.name === 'percent').value;

    if (currentPercent <= percentLeft) {
      const request = {
        activity: inputs.find(aux => aux.name === 'activity').value,
        category: inputs.find(aux => aux.name === 'category').value,
        child: inputs.find(aux => aux.name === 'child').value,
        percent: currentPercent,
        active: inputs.find(aux => aux.name === 'active').value,
        description: inputs.find(aux => aux.name === 'description').value,
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
      openNotificationMessage(type, t(`activity.message.${response.code}`));
    } else {
      openNotificationMessage('danger', t('activity.message.-98'));
    }
  };

  const formPercentLeft = <ActivityFormPercentLeft percentLeft={percentLeft} />;

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
        name: 'activity',
        label: t('activity.form.control1'),
        type: 'text',
        sizeXs: 12,
        sizeMd: 6,
        validation: 'name|required|length:1,30',
      },
      {
        name: 'category',
        label: t('activity.form.control2'),
        type: 'select',
        sizeXs: 12,
        sizeMd: 6,
        options: categories,
        validation: 'required',
      },
      {
        name: 'child',
        label: t('activity.form.control3'),
        type: 'select',
        sizeXs: 12,
        sizeMd: 6,
        options: children,
        validation: 'required',
        afterChange: setChild,
      },
      {
        name: 'percent',
        label: t('activity.form.control4'),
        type: 'text',
        sizeXs: 6,
        sizeMd: 3,
        validation: 'number|required|length:1,3',
      },
      {
        name: 'active',
        label: t('activity.form.control5'),
        type: 'checkbox',
        sizeXs: 6,
        sizeMd: 3,
      },
      {
        name: 'description',
        label: t('activity.form.control6'),
        type: 'textarea',
        sizeXs: 12,
        sizeMd: 12,
        validation: 'text|length:0,500',
      },
    ],

    actions: [
      {
        variant: 'primary',
        text: t('action.save'),
        onClick: saveRecord,
      },
      {
        url: '/activity',
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
      extendForm={formPercentLeft}
    />
  );
};

export default ActivityForm;
