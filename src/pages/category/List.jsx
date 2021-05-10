/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../components/PageTitle';
import CategoryList from '../../components/category/CategoryList';

const List = props => {
  const { t } = useTranslation();

  const { location } = props;
  const { pathname } = location;

  const pageTitle = {
    title: t('category.list.title'),
    breadcrumbs: [
      {
        url: '/',
        link: t('home.title'),
      },
      {
        url: pathname,
        link: t('category.list.title'),
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
          <CategoryList {...props} />
        </Col>
      </Row>
    </Container>
  );
};

export default List;
