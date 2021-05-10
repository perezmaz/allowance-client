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
import ProfileForm from '../../components/user/ProfileForm';

const Profile = props => {
  const { location } = props;
  const { pathname } = location;

  const { t } = useTranslation();

  const pageTitle = {
    title: t('profile.form.title'),
    breadcrumbs: [
      {
        url: '/',
        link: t('home.title'),
      },
      {
        url: pathname,
        link: t('profile.form.title'),
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
          <ProfileForm {...props} />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
