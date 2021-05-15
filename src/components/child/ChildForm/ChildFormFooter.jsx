/* eslint-disable react/prop-types */
import React from 'react';
import {
  Row,
  Col,
  Alert,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { resend } from '../../../api/child';
import useMessage from '../../../hooks/useMessage';

const ChildFormFooter = ({ id }) => {
  const { t } = useTranslation();

  const { openNotificationMessage } = useMessage();

  const resendEmail = async event => {
    event.preventDefault();
    event.target.setAttribute('disabled', 'disabled');

    const response = await resend(id);
    let type = 'info';
    if (response.code !== 0) {
      type = 'danger';
    }

    event.target.removeAttribute('disabled');
    openNotificationMessage(type, t(`child.message.activation.${response.code}`));
  };

  const ResentLink = () => (
    <>
      {t('child.form.info3')}
      <Button
        variant="link"
        className="fs-13 m0 p0 resend-link text-underline"
        onClick={resendEmail}
      >
        Click here
      </Button>
    </>
  );

  return (
    <>
      <Row className="mt-3">
        <Col>
          <Alert variant="info" className="fs-13 text-center">
            {id === 0
              ? t('child.form.info2')
              : <ResentLink />}
          </Alert>
        </Col>
      </Row>
    </>
  );
};

export default ChildFormFooter;
