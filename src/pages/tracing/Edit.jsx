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
import TracingFormEdit from '../../components/tracing/TracingForm/TracingFormEdit';

const Edit = props => {
  const { location } = props;
  const { pathname } = location;

  const { t } = useTranslation();

  const pageTitle = {
    title: t('tracing.form.edit.title'),
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
        link: t('tracing.form.edit.title'),
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
          <TracingFormEdit {...props} />
        </Col>
      </Row>
    </Container>
  );
};

export default Edit;
