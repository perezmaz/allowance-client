/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { React } from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../components/PageTitle';
import TracingList from '../../components/tracing/TracingList';

const List = props => {
  const { location } = props;
  const { pathname } = location;

  const { t } = useTranslation();

  const pageTitle = {
    title: t('tracing.list.title'),
    breadcrumbs: [
      {
        url: '/',
        link: t('home.title'),
      },
      {
        url: pathname,
        link: t('tracing.list.title'),
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
          <TracingList {...props} />
        </Col>
      </Row>
    </Container>
  );
};

export default List;
