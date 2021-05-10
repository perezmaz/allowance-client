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
import ActivityForm from '../../components/activity/ActivityForm';

const AddEdit = props => {
  const { location } = props;
  const { pathname } = location;

  const { t } = useTranslation();

  const pageTitle = {
    title: t('activity.form.title'),
    breadcrumbs: [
      {
        url: '/',
        link: t('home.title'),
      },
      {
        url: '/activity',
        link: t('activity.list.title'),
      },
      {
        url: pathname,
        link: t('activity.form.title'),
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
          <ActivityForm {...props} />
        </Col>
      </Row>
    </Container>
  );
};

export default AddEdit;
