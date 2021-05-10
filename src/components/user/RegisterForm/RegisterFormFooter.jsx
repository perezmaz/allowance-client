import React from 'react';
import {
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';

const RegisterFormFooter = () => {
  const { t } = useTranslation();

  return (
    <>
      <Row>
        <Col className="divider" />
      </Row>
      <Row className="text-center">
        <Col>
          {t('register.form.old')}
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <LinkContainer
            to="/login"
          >
            <Button variant="link" className="m0 p0">{t('register.form.login')}</Button>
          </LinkContainer>
        </Col>
      </Row>
    </>
  );
};

export default RegisterFormFooter;
