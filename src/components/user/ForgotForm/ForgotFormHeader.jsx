import React from 'react';
import {
  Row,
  Col,
  Alert,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ForgotFormHeader = () => {
  const { t } = useTranslation();

  return (
    <>
      <Row className="text-center text-primary">
        <Col>
          <h4 className="m0 p0 mb-4">{t('forgot.form.title')}</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert variant="info" className="fs-13 text-center">
            {t('forgot.form.info')}
          </Alert>
        </Col>
      </Row>
    </>
  );
};

export default ForgotFormHeader;
