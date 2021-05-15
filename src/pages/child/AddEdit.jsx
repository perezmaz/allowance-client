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
import ChildForm from '../../components/child/ChildForm';

const AddEdit = props => {
  const { location, match, history } = props;
  const { params } = match;
  const { pathname } = location;
  const { id = 0 } = params;

  const { t } = useTranslation();

  const goBack = () => {
    history.goBack();
  };

  const pageTitle = {
    title: id === 0 ? t('child.form.title') : t('child.form.title.edit'),
    breadcrumbs: [
      {
        url: '/',
        link: t('home.title'),
      },
      {
        url: '/child',
        link: t('child.list.title'),
      },
      {
        url: pathname,
        link: id === 0 ? t('child.form.title') : t('child.form.title.edit'),
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
          <ChildForm {...props} saveCallback={goBack} />
        </Col>
      </Row>
    </Container>
  );
};

export default AddEdit;
