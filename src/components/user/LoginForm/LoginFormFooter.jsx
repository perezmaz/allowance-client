import React from 'react';
import {
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';

const LoginFormFooter = () => {
  const { t } = useTranslation();

  return (
    <>
      <Row>
        <Col className="divider" />
      </Row>
      <Row className="text-center">
        <Col>
          {t('login.form.new')}
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <LinkContainer
            to="/register"
          >
            <Button variant="link" className="m0 p0">{t('login.form.register')}</Button>
          </LinkContainer>
        </Col>
      </Row>
    </>
  );
};

export default LoginFormFooter;
