import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LoginFormHeader = () => {
  const { t } = useTranslation();

  return (
    <>
      <Row className="text-center text-primary">
        <Col>
          <h4 className="m0 p0 mb-1">{t('login.form.title')}</h4>
        </Col>
      </Row>
      <Row className="text-center text-dark">
        <Col>
          <h6 className="m0 p0 mb-4">{t('login.form.subtitle')}</h6>
        </Col>
      </Row>
    </>
  );
};

export default LoginFormHeader;
