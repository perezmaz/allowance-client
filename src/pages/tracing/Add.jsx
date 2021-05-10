/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../components/PageTitle';
import TracingForm from '../../components/tracing/TracingForm';

const Add = props => {
  const { location } = props;
  const { pathname } = location;

  const { t } = useTranslation();

  const pageTitle = {
    title: t('tracing.form.title'),
    breadcrumbs: [
      {
        url: '/',
        link: t('home.title'),
      },
      {
        url: '/tracing',
        link: t('tracing.list.title'),
      },
      {
        url: pathname,
        link: t('tracing.form.title'),
      },
    ],
  };

  return (
    <Container fluid="sm">
      <Row>
        <Col>
          <PageTitle
            title={pageTitle.title}
            breadcrumbs={pageTitle.breadcrumbs}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TracingForm {...props} />
        </Col>
      </Row>
    </Container>
  );
};

export default Add;
