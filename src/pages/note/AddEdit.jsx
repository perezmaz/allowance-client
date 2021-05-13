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
import CategoryForm from '../../components/note/NoteForm';

const AddEdit = props => {
  const { location, match } = props;
  const { params } = match;
  const { pathname } = location;
  const { id = 0 } = params;

  const { t } = useTranslation();

  const pageTitle = {
    title: id === 0 ? t('note.form.title') : t('note.form.title.edit'),
    breadcrumbs: [
      {
        url: '/',
        link: t('home.title'),
      },
      {
        url: '/note',
        link: t('note.list.title'),
      },
      {
        url: pathname,
        link: id === 0 ? t('note.form.title') : t('note.form.title.edit'),
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
          <CategoryForm {...props} />
        </Col>
      </Row>
    </Container>
  );
};

export default AddEdit;
