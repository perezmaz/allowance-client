/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { activate } from '../../api/user';
import useMessage from '../../hooks/useMessage';

const ActivateForm = props => {
  const { match } = props;
  const { params } = match;
  const { token = '' } = params;

  const { t } = useTranslation();
  const { openNotificationMessage } = useMessage();

  useEffect(() => {
    if (token !== '') {
      const request = {
        token,
      };
      activate(request)
        .then(response => {
          if (response.code === 0) {
            setTimeout(() => {
              window.location = '/';
            }, 3000);
          } else {
            openNotificationMessage('danger', t('login.message.-1'));
          }
        })
        .catch(() => {
          openNotificationMessage('danger', t('login.message.-1'));
        });
    }
  }, []);

  return (
    <Card className="mt-5">
      <Card.Body className="text-primary text-center">
        <h5>{t('activate.form.message')}</h5>
      </Card.Body>
    </Card>
  );
};

export default ActivateForm;
